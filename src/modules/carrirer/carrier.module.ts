import { Module } from '@nestjs/common';
import { CarrierController } from './controllers/carrier.controller';
import { CarrierService } from './services/carrier.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../schemas/user.schema";
import { RolesGuard } from '../custom/rbac/guard/roles.guard';
import { Carrier, CarrierSchema } from '../../schemas/carrier.schema';
import { UserFavoriteCarrier, UserFavoriteCarrierSchema } from '../../schemas/userFavoriteCarrier.schema';
import { Promotion, PromotionSchema } from '../../schemas/promotion.schema';
import { CarrierPromotion, CarrierPromotionSchema } from '../../schemas/carrierPromotions.schema';
import { PromotionController } from './controllers/promotion.controller';
import { PromotionService } from './services/promotion.service';



@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Carrier.name, schema: CarrierSchema },
        { name: UserFavoriteCarrier.name, schema: UserFavoriteCarrierSchema },
        { name: Promotion.name, schema: PromotionSchema },
        { name: CarrierPromotion.name, schema: CarrierPromotionSchema },
        { name: 'User', schema: UserSchema }
      ]),
  ],
  controllers: [CarrierController , PromotionController],
  providers: [CarrierService, RolesGuard, PromotionService],
})
export class CarrierModule { }