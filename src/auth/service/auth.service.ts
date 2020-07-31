import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { SignupDto } from './../../user/dto/signup.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signupDto: SignupDto): Promise<void> {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);

        const {password, ...data} = signupDto;

        const user = new this.userModel({ password: hashedPassword, ...data });

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async signIn(user: User) {
        const userData: any = user;
        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            photo: userData.photo,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            isApproved: userData.isApproved,
            createdAt: userData.createdAt
         };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(pass, user.password);

        if (valid) {
            return user;
        }

        return null;
    }
}
