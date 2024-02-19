import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({
    timestamps: false,
    versionKey: false,
})

export class Department {
    @Prop({ required: true })
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);