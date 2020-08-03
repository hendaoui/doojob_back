import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './schemas/review.schema';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { ReviewController } from './controller/review.controller';
import { ReviewService } from './service/review.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]), UserModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
