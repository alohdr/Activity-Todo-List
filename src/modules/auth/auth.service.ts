import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';



@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,private readonly jwtService: JwtService,) { }

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findOneByEmail(username, username);
        if (!user) {
            return null;
        }


        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        const { password, ...result } = user['dataValues'];
        return result;
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
    }
    
    public async logout() {

        let logoutResponse = {
            status:"success",
            message:"logout successfully"
        }

        return logoutResponse;
    }

    public async create(user) {
        await this.confirmPassword(user.password, user.confirm_password)

        const pass = await this.hashPassword(user.password);

        const newUser = await this.userService.create({ ...user, password: pass});

        const { password, ...result } = newUser['dataValues'];

        const token = await this.generateToken(result);

        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async confirmPassword(inputPassword, inputConfirmPassword) {
        if (inputPassword != inputConfirmPassword) {
            throw new BadRequestException('your confirm password not match');
        }
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
