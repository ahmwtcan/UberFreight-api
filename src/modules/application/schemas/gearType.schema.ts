import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GearTypeDocument = GearType & Document;
@Schema({
    timestamps: false,
    versionKey: false,
})

export class GearType {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const GearTypeSchema = SchemaFactory.createForClass(GearType);