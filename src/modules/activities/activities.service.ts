import { Injectable, Inject } from '@nestjs/common';
import { Activity } from './activity.entity';
import { ActivityDto } from './dto/activities.dto';
import { User } from '../users/user.entity';
import { ACTIVITY_REPOSITORY } from '../../core/constants';

@Injectable()
export class ActivitiesService {
    constructor(@Inject(ACTIVITY_REPOSITORY) private readonly activityRepository: typeof Activity) { }

    async create(post: ActivityDto, userId): Promise<Activity> {
        return await this.activityRepository.create<Activity>({ ...post, userId });
    }

    async findAll(userId): Promise<Activity[]> {
        return await this.activityRepository.findAll<Activity>({
            where: {userId},
        	include: [{ model: User, attributes: { exclude: ['password'] } }],
    	});
    }

    async findOne(id,userId): Promise<Activity> {
        return await this.activityRepository.findOne({
        	where: { id, userId },
        	include: [{ model: User, attributes: { exclude: ['password'] } }],
    	});
    }

    async delete(id, userId) {
        return await this.activityRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedPost]] = await this.activityRepository.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
}
