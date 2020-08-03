import { UserService } from './../../user/service/user.service';
import { CreateIssueDto } from './../dto/createIssue.dto';
import { Issue } from './../schemas/issue.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class IssueService {
    constructor(
        @InjectModel('Issue') private issueModel: Model<Issue>,
        private userService: UserService
    ) { }

    async createIssue(createIssueDto: CreateIssueDto): Promise<Issue> {
        const createdIssue = new this.issueModel(createIssueDto);
        return await createdIssue.save();
    }

    async findAll(): Promise<Issue[]> {
        let list = await this.issueModel.find().lean();

        let newList: any = await list.map(async issue => {
            let user = await this.userService.findOne(issue.author)

            return ({
                ...issue, author: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                    photo: user?.photo,
                    rating: user?.raiting
                }
            })
        })

        return Promise.all(newList.reverse());
    }

    async findOne(id): Promise<Issue> {
        return this.issueModel.findOne({_id: id})
    }
}
