import { Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CarrierService } from '../services/carrier.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../custom/decorator/role.decorator';
import { Role } from '../../custom/rbac/enum/role.enum';
import { JwtAuthGuard } from '../../custom/jwt/guard/jwt.guard';
import { RolesGuard } from '../../custom/rbac/guard/roles.guard';

@ApiTags('Carrier')
@ApiSecurity('access-token')
@Controller('carrier')
export class CarrierController {
  constructor(private carrierService: CarrierService) { }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  @ApiOkResponse({ description: 'Get carrier by id' })
  async getCarrierById(@Param('id') id: string) {
    return await this.carrierService.getCarrierById(id);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user-favorite/carriers')
  @ApiSecurity('access-token')
  @ApiOkResponse({ description: 'Get user favorite carriers' })
  async getUserFavoriteCarriers(@Req() req) {
    return await this.carrierService.getUserFavoriteCarriers(req.user.id);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('carrier-promotions/:carrierId')
  @ApiSecurity('access-token')
  @ApiOkResponse({ description: 'Get carrier promotions' })
  async getCarrierPromotions( @Param('carrierId') carrierId: string) {
    return await this.carrierService.getCarrierPromotions(carrierId);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add-user-favorite-carrier/:carrierId')
  @ApiSecurity('access-token')
  @ApiOkResponse({ description: 'Add user favorite carrier' })
  async addUserFavoriteCarrier(@Req() req , @Param('carrierId') carrierId: string ){
    return await this.carrierService.addUserFavoriteCarrier(req.user.id, carrierId);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('access-token')
  @Put('remove-user-favorite-carrier/:carrierId')
  @ApiOkResponse({ description: 'Remove user favorite carrier' })
  async removeUserFavoriteCarrier(@Req() req , @Param('carrierId') carrierId: string) {
    return await this.carrierService.removeUserFavoriteCarrier(req.user.id, carrierId);
  }



}