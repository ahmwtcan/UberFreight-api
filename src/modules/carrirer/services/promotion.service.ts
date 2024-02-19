import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Promotion } from '../../../schemas/promotion.schema';
import { CarrierPromotion } from '../../../schemas/carrierPromotions.schema';
import {  ConflictException, Injectable,  } from '@nestjs/common';


@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: mongoose.Model<Promotion>,
    @InjectModel(CarrierPromotion.name)
    private carrierPromotionModel: mongoose.Model<CarrierPromotion>,
  ) { }


  async getPromotionById(id: string) {
    return await this.promotionModel.findById(id);
  }

  async addCarrierPromotion(carrierId: string, promotionId: string) {
    const carrierPromotion = await this.carrierPromotionModel.findOne({
      CarrierID: carrierId,
      PromotionID: promotionId,
      IsDeleted: false,
    });
    if (carrierPromotion) {
      return new ConflictException("Carrier already has the promotion");
    }
    const newCarrierPromotion = new this.carrierPromotionModel({
        CarrierID: carrierId,
        PromotionID: promotionId,
    });
    return await newCarrierPromotion.save();
  }


  async removeCarrierPromotion(carrierId: string, promotionId: string) {
    const carrierPromotion = await this.carrierPromotionModel.findOne({
      CarrierID: carrierId,
      PromotionID: promotionId,
      IsDeleted: false,
    });
    if (!carrierPromotion) {
      return new ConflictException("Carrier does not have the promotion");
    }
    carrierPromotion.IsDeleted = true;
    return await carrierPromotion.save();
  }
async getRandomCarrierPromotion(carrierId: string) {

  return await this.carrierPromotionModel.findOne(
  { CarrierID: carrierId, IsDeleted: false } ,
  ).populate('PromotionID');

}
}
