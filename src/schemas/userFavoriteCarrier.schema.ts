import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Carrier } from './carrier.schema';

export type UserFavoriteCarrierDocument = UserFavoriteCarrier & Document;
@Schema({
    timestamps: true,
    versionKey: false,
})
export class UserFavoriteCarrier {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: User.name,
        required: true
    })
    UserID: User;
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Carrier.name,
        required: true
    })
    CarrierID: Carrier;
    @Prop({ default: false })
    IsDeleted: boolean;
}

export const UserFavoriteCarrierSchema = SchemaFactory.createForClass(UserFavoriteCarrier);
