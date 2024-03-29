import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IssueModule } from './issue/issue.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/doojob', {useCreateIndex: true, useFindAndModify: false}), UserModule, AuthModule, IssueModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
