
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MediaRoleType } from '../../application/schemas/mediaRoleType.schema';
import { Type } from 'class-transformer';
export type MediaDocument = Media & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})

export class Media {
    @Prop({ required: true })
    MediaOwnerId: string;
    @Prop({ required: true })
    FileLink: string;
    @Prop({ required: false })
    Rank: number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MediaRoleType.name })
    @Type(() => MediaRoleType)
    MediaType: MediaRoleType;
    @Prop()
    CacheId: number;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const MediaSchema = SchemaFactory.createForClass(Media);