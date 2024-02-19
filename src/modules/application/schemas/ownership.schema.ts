import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OwnershipTypeDocument = OwnershipType & Document;
@Schema({
    timestamps: false,
    versionKey: false,
})

export class OwnershipType {
    @Prop()
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const OwnershipTypeSchema = SchemaFactory.createForClass(OwnershipType);