import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: false, default: ""})
  photo: string;

  @Prop({required: true})
  phoneNumber: number;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: false, default: ""})
  cardNumber: number;

  @Prop({required: false, default: ""})
  cardFace: string;

  @Prop({required: false, default: ""})
  cardBack: string;

  @Prop({required: false, default: false})
  isApproved: boolean;
  
  @Prop({required: false, default: true})
  active: boolean;

  @Prop({required: false, default: 0})
  raiting: number;
}

export const UserSchema = SchemaFactory.createForClass(User);