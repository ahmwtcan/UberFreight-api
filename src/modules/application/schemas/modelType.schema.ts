import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModelTypeDocument = ModelType & Document;


@Schema({
    timestamps: false,
    versionKey: false,
})

export class ModelType {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const ModelTypeSchema = SchemaFactory.createForClass(ModelType);