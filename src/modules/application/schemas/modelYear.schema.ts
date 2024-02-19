import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ModelYearDocument = ModelYear & Document;
@Schema({
    timestamps: false,
    versionKey: false,
})

export class ModelYear {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const ModelYearSchema = SchemaFactory.createForClass(ModelYear);