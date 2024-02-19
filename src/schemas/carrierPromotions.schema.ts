import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { Carrier } from './carrier.schema';
import { Promotion } from './promotion.schema';

export type CarrierPromotionDocument = CarrierPromotion & Document;
@Schema({
    timestamps: true,
    versionKey: false,
})
export class CarrierPromotion {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Carrier.name,
        required: true
    })
    @Type(() => Carrier)
    CarrierID: Carrier;
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Promotion.name,
        required: true
    })
    @Type(() => Promotion)
    PromotionID: Promotion;
    @Prop({ default: false })
    IsDeleted: boolean;

}   

export const CarrierPromotionSchema = SchemaFactory.createForClass(CarrierPromotion);