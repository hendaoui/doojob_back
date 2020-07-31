import { UserService } from '../service/user.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Controller, UseGuards, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    findAll() {
        return this.userService.findAll();
    }
}
