import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Issue extends Document {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true, default: ""})
  photo1: string;

  @Prop({required: false, default: ""})
  photo2: string;

  @Prop({required: false, default: ""})
  photo3: string;

  @Prop({required: true, default: ""})
  author: string;

  @Prop({required: false, default: ""})
  assignee: string;

  @Prop({required: false, default: "available"}) // in_progress or closed
  status: string;

  @Prop(raw({
    latitude: {type: String},
    longitude: {type: String}
  }))
  location: Record<string, any>;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);