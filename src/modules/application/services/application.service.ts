import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import BaseApplicationResponse, { ApplicationList } from '../dtos/responses/baseApplication.response';
import { Connection } from 'mongoose';

@Injectable()
export class ApplicationService{
  constructor(
        @InjectConnection() private readonly connection: Connection
  ) {}
  async listApplication(modelName: string): Promise<BaseApplicationResponse>{
    const model = this.connection.model(modelName);
    const result = await model.find().exec();

    return new BaseApplicationResponse(result.map(item => {
      return new ApplicationList(item._id, item.Name)
    }))
  }
}