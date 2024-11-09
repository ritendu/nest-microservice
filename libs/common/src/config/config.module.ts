import { Module } from '@nestjs/common';
import { ConfigModule as NestjsModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    NestjsModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    
  ],
  exports: [NestjsModule]
})
export class ConfigModule {}
