import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivitiesService } from './activities.service';
import { Activity as ActivityEntity } from './activity.entity';
import { ActivityDto, ActivityEditDto } from './dto/activities.dto';

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activityService: ActivitiesService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.activityService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ActivityEntity> {
        // find the post with this id
        const post = await this.activityService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!post) {
            throw new NotFoundException('This Activity doesn\'t exist');
        }

        // if post exist, return the post
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: ActivityDto, @Request() req): Promise<ActivityEntity> {
        // create a new post and return the newly created post
        return await this.activityService.create(post, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: ActivityEditDto, @Request() req): Promise<ActivityEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPost } = await this.activityService.update(id, post, req.user.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Activity doesn\'t exist');
        }

        // return the updated post
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.activityService.delete(id, req.user.id);

        if (deleted === 0) {
            throw new NotFoundException('This Activity doesn\'t exist');
        }

        let respError = {
            status: "Success",
            message:"Successfully deleted"
        }

        return respError;
    }
}
