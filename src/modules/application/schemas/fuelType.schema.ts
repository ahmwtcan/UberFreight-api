import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type FuelTypeDocument = FuelType & mongoose.Document;

@Schema({
    timestamps: false,
    versionKey: false,
})

export class FuelType {
    @Prop({ required: true })
    Name: string;
    @Prop({ required: false })
    Price: number;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const FuelTypeSchema = SchemaFactory.createForClass(FuelType);
