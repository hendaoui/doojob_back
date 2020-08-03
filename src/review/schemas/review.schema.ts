import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({required: true})
  reviewer: string;
  
  @Prop({required: true})
  reviewee: string;

  @Prop({required: true})
  message: string;

  @Prop({required: true})
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);