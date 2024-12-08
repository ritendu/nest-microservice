import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { LocalStategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersRepository } from './users/user.repository';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './users/models/user.model';
@Module({
  imports: [UsersModule, 
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot({
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
  providers: [AuthService,LocalStategy,JwtStrategy,UsersRepository],
})
export class AuthModule {}
