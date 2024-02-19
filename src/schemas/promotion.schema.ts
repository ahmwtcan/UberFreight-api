import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

export type PromotionDocument = Promotion & Document;
@Schema({
    timestamps: true,
    versionKey: false,
})
export class Promotion {
    @Prop({ required: true })
    Name: string;
    @Prop({ required: true })
    IsActive: boolean;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);