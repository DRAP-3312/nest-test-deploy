import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ match: /^#[0-9A-F]{6}$/i })
  color: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
