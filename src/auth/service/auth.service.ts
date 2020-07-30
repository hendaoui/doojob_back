import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { SignupDto } from './../../user/dto/signup.dto';
import { Injectable, ConflictException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<any>,
        private jwtService: JwtService
    ) { }

    async signUp(signupDto: SignupDto): Promise<void> {
        const { email, password, firstName, lastName, phoneNumber } = signupDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({ email, password: hashedPassword, firstName, lastName, phoneNumber });

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
        const payload = { user };
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
