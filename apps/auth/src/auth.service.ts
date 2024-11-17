import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.model';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    console.log(user,"user login")
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = await this.jwtService.sign(tokenPayload);
    console.log(token,"token???")
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
    return token;
  }
}
