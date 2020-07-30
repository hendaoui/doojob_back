import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: false})
  photo: string;

  @Prop({required: true})
  phoneNumber: number;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: false})
  cardNumber: number;

  @Prop({required: false})
  cardFace: string;

  @Prop({required: false})
  cardBack: string;

  @Prop({required: false})
  isApproved: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);