import { UserModule } from './../user/user.module';
import { IssueSchema } from './schemas/issue.schema';
import { Module } from '@nestjs/common';
import { IssueController } from './controller/issue.controller';
import { IssueService } from './service/issue.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Issue', schema: IssueSchema }]), UserModule],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
