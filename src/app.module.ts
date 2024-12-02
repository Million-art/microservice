import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'], // Load environment variables
      isGlobal: true, // Make ConfigModule globally available
    }),
    TypeOrmModule.forRootAsync({
       inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // Database type
        host: 'localhost', // Database host from environment variable
        port: 3306, // Database port from environment variable
        username: 'root', // Database username
        password: '', // Database password
        database:  'microservice', // Database name
        autoLoadEntities: true, // Automatically load entities from your directories (remove it on production)
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Paths to your entities
        synchronize: true, // Auto sync the schema; use false in production
      })

    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
