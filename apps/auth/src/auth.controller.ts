import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.strategy.guard';
import { UserDocument } from './users/models/user.model';
import { CurrentUser } from './current-user-decorator';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.strategy.guard';
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Res({ passthrough: true }) response: Response){
 const loggedInUser = await this.authService.login(user,response);
 console.log(loggedInUser,"loggedInUser")
  response.send(loggedInUser);
  }

@UseGuards(JwtAuthGuard)
 @Get('get/user')
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }

}
