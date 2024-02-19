import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

export type CarrierDocument = Carrier & Document;
@Schema({
    timestamps: true,
    versionKey: false,
    })
export class Carrier {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const CarrierSchema = SchemaFactory.createForClass(Carrier);