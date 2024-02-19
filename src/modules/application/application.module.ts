import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationController } from './controllers/application.controller';
import { ApplicationService } from './services/application.service';
import { PromotionSchema } from '../../schemas/promotion.schema';
import { CarrierSchema } from '../../schemas/carrier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Promotion', schema: PromotionSchema },
      { name: 'Carrier', schema: CarrierSchema }
    ])
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule { }
