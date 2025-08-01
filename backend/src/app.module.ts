import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { OrderService } from './order/order.service';
import { FilmsController } from './films/films.controller';
import { FilmsRepository } from './repository/films.repository';
import { configProvider } from './app.config.provider';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { Film, FilmSchema } from './repository/films.schema';

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
        }),MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),

        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', 'public', 'content/afisha'),
            serveRoot: '/content/afisha/',
        }),
      
    ],
    controllers: [OrderController, FilmsController],
    providers: [ FilmsRepository, FilmsService, OrderService, configProvider],
})
export class AppModule {}