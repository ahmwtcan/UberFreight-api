import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas/user.schema';
import * as mongoose from 'mongoose';
import { LoginRequest } from '../dtos/requests/login.request';
import * as bcrypt from 'bcrypt';
import LoginResponse from '../dtos/responses/login.response';
import { AcceptInviteRequest } from '../dtos/requests/acceptInvite.request';
import { JwtService } from '@nestjs/jwt';
import { AcceptInviteResponse } from '../dtos/responses/acceptInvite.response';
import {Cron} from "@nestjs/schedule";
import {sendEmail} from "../../../statics/helper/sendEmail";

import { Role } from '../../custom/rbac/enum/role.enum';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,

  ) { }

  async login(req: LoginRequest): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ Email: req.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatch = await bcrypt.compare(
      req.password,
      user.PasswordHashed,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id, fullName: user.FullName, roles: user.Roles  });
    return new LoginResponse(token);
  }

  async acceptInvite(req: AcceptInviteRequest): Promise<AcceptInviteResponse> {


    const userExists = await this.userModel.findOne({ Email
      : req.email });
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(req.password, 10);


    const user = await this.userModel.create({
        PhoneNumber: req.phoneNumber,
        PasswordHashed: hashedPassword,
        FullName: req.fullName,
        Department:req.department,
        Email:req.email,
        Roles: Role.User,
    })

    const token = this.jwtService.sign({ id: user._id, fullName: user.FullName, roles: user.Roles  });

    return new AcceptInviteResponse(token);
  }

  async getUsers(): Promise<User[]> {

    const users = await this.userModel.find();
    return users;
  }

  @Cron('00 10 * * 1') // Her Pazartesi saat 10:00
  public async sendWeeklyEmails() {
    const users = await this.userModel.find({IsDeleted:false}).exec();
    for (const user of users) {
      const toAddress = user.Email;
      const subject = 'Araç Takip Sistemi';
      const body = 'Bu haftalık kilometre bilgisi girişinizi yapmayı unutmayınız.';
      await sendEmail(toAddress, body, subject);
    }
  }
}
