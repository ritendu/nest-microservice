// libs/database/database.module.ts
import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';  // Import ConfigModule

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Retrieve MONGO_URI from ConfigService
      }),
      inject: [ConfigService], // Inject ConfigService to be used in useFactory
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
