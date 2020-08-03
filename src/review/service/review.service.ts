import { ReviewDto } from './../dto/review.dto';
import { UserService } from './../../user/service/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './../schemas/review.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private reviewModel: Model<Review>,
        private userService: UserService
    ) { }

    async createReview(reviewDto: ReviewDto): Promise<Review> {
        const createdReview = new this.reviewModel(reviewDto);
        return await createdReview.save();
    }

    async findAll(): Promise<Review[]> {
        let list = await this.reviewModel.find().lean();

        let newList: any = await list.map(async review => {
            let user = await this.userService.findOne(review.reviewer)

            return ({
                ...review, reviewer: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                    photo: user?.photo
                }
            })
        })

        return Promise.all(newList.reverse());
    }
}
