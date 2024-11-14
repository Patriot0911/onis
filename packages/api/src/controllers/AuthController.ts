import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserRequest } from '../utils/security/UserRequest';
import { UserResponse } from '../responses/UserResponse';
import { AuthService } from '../services/AuthService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthUserDTO } from 'src/dtos/AuthUserDTO';
import { UserMapper } from '../mappers/UserMapper';
import { Access } from '../utils/security/Access';
import { User } from '../schemas/UserSchema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Access()
  @Get('me')
  async getMe(@UserRequest() userReq: User): Promise<UserResponse> {
    const user = await this.authService.getMe(userReq);
    return UserMapper.getUserResponse(user);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthUserDTO,
  ): Promise<void> {
    return this.authService.login(res, body);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(res);
  }

  @Post('register')
  async register(@Body() body: CreateUserDTO): Promise<UserResponse> {
    const user = await this.authService.register(body);
    return UserMapper.getUserResponse(user);
  }
}
