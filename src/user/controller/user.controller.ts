import { UserService } from '../service/user.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Controller, UseGuards, Get, Request, Post, Body, Res, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/verify_account')
    verifyAccount(@Body() body) {
        return this.userService.verifyAccount(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    findOne(@Param('email') email) {
        return this.userService.findOne(email);
    }
}
