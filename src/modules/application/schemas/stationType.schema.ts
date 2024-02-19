import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationTypeDocument = StationType & Document;
@Schema({
    timestamps: false,
    versionKey: false,
})

export class StationType {
    @Prop()
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const StationTypeSchema = SchemaFactory.createForClass(StationType);