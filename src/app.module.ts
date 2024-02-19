import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalJwtModule } from './modules/custom/jwt/globalJwt.module';
import {ScheduleModule} from "@nestjs/schedule";
import { CarrierModule } from './modules/carrirer/carrier.module';
import { ApplicationModule } from './modules/application/application.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    ScheduleModule.forRoot(),
    GlobalJwtModule,
    CarrierModule,
    ApplicationModule

  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
