import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Promise } from 'mongoose';
import { User } from '../../../schemas/user.schema';
import { LoginRequest } from '../dtos/requests/login.request';
import LoginResponse from '../dtos/responses/login.response';
import { AcceptInviteRequest } from '../dtos/requests/acceptInvite.request';
import { AcceptInviteResponse } from '../dtos/responses/acceptInvite.response';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../custom/jwt/guard/jwt.guard';
import { RolesGuard } from '../../custom/rbac/guard/roles.guard';
import { Role } from '../../custom/rbac/enum/role.enum';
import { Roles } from '../../custom/decorator/role.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @ApiOkResponse({ type: LoginResponse })
  @Post('/login')
  async login(@Body() req: LoginRequest): Promise<LoginResponse> {
    return this.userService.login(req);
  }
  @ApiOkResponse({ type: AcceptInviteResponse })
  @Post('/register')
  async acceptInvite(@Body() req: AcceptInviteRequest): Promise<AcceptInviteResponse> {
    return this.userService.acceptInvite(req);
  }

  @Get()
  @ApiSecurity('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
