import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
@Module({
  imports: [UsersModule,  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGO_URI: Joi.string().required(),
    }),
  }),
  JwtModule.registerAsync({
    inject: [ConfigService], // Specify ConfigService as a dependency
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`,
      },
    }),
  }),
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
