import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ReviewService } from './../service/review.service';
import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';

@Controller('review')
export class ReviewController {
    constructor(
        private reviewService: ReviewService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async create(@Body() body) {
        return this.reviewService.createReview(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    findAll() {
        return this.reviewService.findAll();
    }
}
