import {  ConflictException, Injectable,  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose from "mongoose";
import { SuccessWithNoDataDto } from "../../application/succesWithNoDataDto";
import { InjectModel } from "@nestjs/mongoose";
import { Carrier } from '../../../schemas/carrier.schema';
import { UserFavoriteCarrier } from '../../../schemas/userFavoriteCarrier.schema';
import { Promotion } from '../../../schemas/promotion.schema';
import { CarrierPromotion } from '../../../schemas/carrierPromotions.schema';


import { User } from "../../../schemas/user.schema";

@Injectable()
export class CarrierService {
  constructor(
    @InjectModel(Carrier.name)
    private carrierModel: mongoose.Model<Carrier>,
    @InjectModel(UserFavoriteCarrier.name)
    private userFavoriteCarrierModel: mongoose.Model<UserFavoriteCarrier>,
    @InjectModel(Promotion.name)
    private promotionModel: mongoose.Model<Promotion>,
    @InjectModel(CarrierPromotion.name)
    private carrierPromotionModel: mongoose.Model<CarrierPromotion>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private jwtService: JwtService,

  ) { }

  async getCarrierById(id: string) {
    return await this.carrierModel.findById(id);
  }

async getUserFavoriteCarriers(userId: string) {
  return await this.userFavoriteCarrierModel.find({ UserID: userId, IsDeleted:false }).populate('CarrierID').populate('UserID');
}

async getCarrierPromotions(carrierId: string) {
  return await this.carrierPromotionModel.find({ CarrierID: carrierId });
}

async addCarrierPromotion(carrierId: string, promotionId: string) {

  const carrierPromotion = await this.carrierPromotionModel.findOne({
    carrierId: carrierId,
    promotionId: promotionId,
  });
  if (carrierPromotion) {
    return new ConflictException("Carrier already has the promotion");
  }


  const carrierPromotion1 = new this.carrierPromotionModel({
    CarrierId: carrierId,
    PromotionID: promotionId,
  });
  return await carrierPromotion1.save();
}


async addUserFavoriteCarrier(userId: string, carrierId: string) {


  const userFavoriteCarrier = await this.userFavoriteCarrierModel.findOne({
    UserID: userId,
    CarrierID: carrierId,
    IsDeleted: false,
  });
  if (userFavoriteCarrier) {
    return new ConflictException("Carrier already in user's favorite list");
  }

  const userFavoriteCarrier1 = new this.userFavoriteCarrierModel({
    UserID: userId,
    CarrierID: carrierId,
  });
  return await userFavoriteCarrier1.save();

}

async removeUserFavoriteCarrier(userId: string, carrierId: string) {

  console.log(userId, carrierId);


 await this.userFavoriteCarrierModel.updateOne(
    { UserID: userId, CarrierID: carrierId },
    { $set: { IsDeleted: true } }
  );

  return new SuccessWithNoDataDto(true);

}
  

}

