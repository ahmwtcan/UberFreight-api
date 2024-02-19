import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema({
    timestamps: false,
    versionKey: false,
})

export class Brand {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);