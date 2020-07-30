import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { SignupDto } from './../../user/dto/signup.dto';
import { Body, Controller, Post, ValidationPipe, UseGuards, Request, Get } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) signupDto: SignupDto
    ): Promise<void> {
        return await this.authService.signUp(signupDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
        return this.authService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
        return req.user;
    }
}