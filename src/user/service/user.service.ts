import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.findAll().then((users) => {
      return users.find(user => user.email === email);
    });
  }

  async verifyAccount(data): Promise<any> {
    return this.userModel.findOneAndUpdate({email: data?.email}, {cardBack: data?.cardBack, cardFace: data?.cardFace, isApproved: true}, {new: true}).exec();
  }
}
