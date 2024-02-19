import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketTypeDocument = TicketType & Document;
@Schema({
    timestamps: false,
    versionKey: false,
})

export class TicketType {
    @Prop()
    Name: string;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const TicketTypeSchema = SchemaFactory.createForClass(TicketType);