import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { FilmsModule } from './repository/filma.module'; 
import { OrderService } from './order/order.service';
import { configProvider } from './app.config.provider';
import { OrderController } from './order/order.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>(
                    'DATABASE_URL',
                    'mongodb://localhost:27017/prac',
                ),
            }),
            inject: [ConfigService],
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', 'public', 'content/afisha'),
            serveRoot: '/content/afisha/',
        }),
        FilmsModule, 
    ],
    controllers: [OrderController],
    providers: [OrderService, configProvider],
})
export class AppModule {}