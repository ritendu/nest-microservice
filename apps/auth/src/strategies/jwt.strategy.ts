import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (request: any) => {
            // Log the incoming request details for debugging
            console.log('Request Cookies:', request?.cookies);
            console.log('Request Authentication Header:', request?.headers?.Authentication);
            console.log('Request Authentication Field:', request?.Authentication);
      
            // Attempt to extract the JWT from the possible locations
            const jwt =
              request?.cookies?.Authentication ||
              request?.Authentication ||
              request?.headers?.Authentication;
      
            console.log('Extracted JWT:', jwt); // Log the extracted JWT
      
            return jwt; // Return the extracted JWT
          },
        ]),
        secretOrKey: configService.get('JWT_SECRET'),
      });
      
  }

  async validate({ userId }: TokenPayload) {
    console.log(userId,"userId>>")
    return this.usersService.getUser({ _id: userId });
  }
}
