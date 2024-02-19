import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../modules/user/controllers/user.controller';
import { AcceptInviteRequest } from '../modules/user/dtos/requests/acceptInvite.request';
import { LoginRequest } from '../modules/user/dtos/requests/login.request';
import { AcceptInviteResponse } from '../modules/user/dtos/responses/acceptInvite.response';
import LoginResponse from '../modules/user/dtos/responses/login.response';
import { UserService } from '../modules/user/services/user.service';
import { User, UserSchema } from '../schemas/user.schema';
import { UserModule } from '../modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalJwtModule } from '../modules/custom/jwt/globalJwt.module';
import { AppModule } from '../app.module';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        AppModule,
        UserModule,
        MongooseModule.forFeature([
          { name: 'User', schema: UserSchema },
        ]),
        GlobalJwtModule,
       ]
    }).compile();

    controller = await module.resolve<UserController>(UserController);
    userService = await  module.resolve<UserService>(UserService);
  });

  describe('login', () => {
    it('should return a LoginResponse', async () => {
      const req: LoginRequest = { email: 'test@example.com', password: 'password' };
      const response: LoginResponse = new LoginResponse('token');
      
      jest.spyOn(userService, 'login').mockResolvedValue(response);

      expect(await controller.login(req)).toBe(response);
    });
  });

  describe("UnauthorizedExceptions", () => {
    it("should return a UnauthorizedException", async () => {
      const req: LoginRequest = { email: 'test@example.com', password: 'password' };
        const expextedError = new UnauthorizedException('Invalid email or password');
      jest.spyOn(userService, 'login').mockRejectedValue(expextedError);

      try {
        await controller.login(req);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

        }
    );
  }
  );

  describe('acceptInvite', () => {
    it('should return an AcceptInviteResponse', async () => {
      const req: AcceptInviteRequest = { email: 'test@example.com', password: 'password', phoneNumber: '123456789', fullName: 'Test User', department: 'Test Department' };
      const response: AcceptInviteResponse = new AcceptInviteResponse('token');
      
      jest.spyOn(userService, 'acceptInvite').mockResolvedValue(response);

      expect(await controller.acceptInvite(req)).toBe(response);
    });
  });

  describe("UnauthorizedExceptions", () => {
    it("should return a UnauthorizedException", async () => {
      const req: AcceptInviteRequest = { email: 'test@example.com', password: 'password', phoneNumber: '123456789', fullName: 'Test User', department: 'Test Department' };
      
      const expextedError = new UnauthorizedException('User already exists');
      jest.spyOn(userService, 'acceptInvite').mockRejectedValue(expextedError);

      try {
        await controller.acceptInvite(req);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
        
          }
      );
  }
  );


  describe('getUsers', () => {
    it('should return an array of Users', async () => {
      const users: User[] = [
        { FullName: 'User 1', Email: 'user1@example.com', PasswordHashed: 'hashedPassword1', PhoneNumber:"123123" , IsDeleted: false , Roles: [] },
        { FullName: 'User 2', Email: 'user1@example.com', PasswordHashed: 'hashedPassword1', PhoneNumber:"123123" , IsDeleted: false , Roles: [] },
      ];
      
      jest.spyOn(userService, 'getUsers').mockResolvedValue(users);

      expect(await controller.getUsers()).toBe(users);
    });
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  }
  );
});
