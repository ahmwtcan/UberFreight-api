import { Controller, Get, Param, Post,  UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../custom/decorator/role.decorator';
import { Role } from '../../custom/rbac/enum/role.enum';
import { JwtAuthGuard } from '../../custom/jwt/guard/jwt.guard';
import { RolesGuard } from '../../custom/rbac/guard/roles.guard';
import { PromotionService } from '../services/promotion.service';


@ApiTags('Promotion')
@ApiSecurity('access-token')
@Controller('promotion')
export class PromotionController {
  constructor(private promotionService: PromotionService) { }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  @ApiOkResponse({ description: 'Get promotion by id' })
  async getPromotionById(@Param('id') id: string) {
    return await this.promotionService.getPromotionById(id);
  }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('add-carrier-promotion/:carrierId/:promotionId')
    @ApiSecurity('access-token')
    @ApiOkResponse({ description: 'Add carrier promotion' })
    async addCarrierPromotion( @Param('carrierId') carrierId: string, @Param('promotionId') promotionId: string ){
      return await this.promotionService.addCarrierPromotion(carrierId, promotionId);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiSecurity('access-token')
    @Post('remove-carrier-promotion/:carrierId/:promotionId')
    @ApiOkResponse({ description: 'Remove carrier promotion' })
    async removeCarrierPromotion( @Param('carrierId') carrierId: string, @Param('promotionId') promotionId: string) {
      return await this.promotionService.removeCarrierPromotion(carrierId, promotionId);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('random-carrier-promotion/:carrierId')
    @ApiSecurity('access-token')
    @ApiOkResponse({ description: 'Get random carrier promotion' })
    async getRandomCarrierPromotion( @Param('carrierId') carrierId: string) {
      return await this.promotionService.getRandomCarrierPromotion(carrierId);
    }

}