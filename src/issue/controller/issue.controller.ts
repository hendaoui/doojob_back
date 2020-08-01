import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { IssueService } from './../service/issue.service';
import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';

@Controller('issue')
export class IssueController {
    constructor(
        private issueService: IssueService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async create(@Body() body) {
        return this.issueService.createIssue(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    findAll() {
        return this.issueService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    findOne(@Param('id') id) {       
        return this.issueService.findOne(id);
    }
}
