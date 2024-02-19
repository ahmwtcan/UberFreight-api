import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaRoleTypeDocument = MediaRoleType & Document;

@Schema({
    timestamps: false,
    versionKey: false,
})

export class MediaRoleType {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const MediaRoleTypeSchema = SchemaFactory.createForClass(MediaRoleType);