import { Controller, Get, } from '@nestjs/common';
import { Promise } from 'mongoose';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from '../services/application.service';
import BaseApplicationResponse from '../dtos/responses/baseApplication.response';


@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @ApiOkResponse({type: BaseApplicationResponse})
  @Get('/promotion')
  async listPromotion( model = 'Promotion'): Promise<BaseApplicationResponse>{
    return this.applicationService.listApplication(model)
  }
  @ApiOkResponse({type: BaseApplicationResponse})
  @Get('/carrier')
  async listDepartment(model = 'Carrier'): Promise<BaseApplicationResponse>{
    return this.applicationService.listApplication(model)
  }


}
