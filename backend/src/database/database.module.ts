import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entity/efilm';
import { Schedule } from '../entity/eschedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmFilmsRepository } from 'src/repository/films.repository';
import { FilmsController } from 'src/films/films.controller';
import { OrderController } from 'src/order/order.controller';
import { FilmsService } from 'src/films/films.service';
import { OrderService } from 'src/order/order.service';
import * as path from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_DRIVER', 'postgres') as 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'username'),
        password: configService.get<string>('DATABASE_PASSWORD', 'password'),
        database: configService.get<string>('DATABASE_NAME', 'database_name'),
        entities: [Film, Schedule],
        synchronize: true, 
        logging: true, 
      }),
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content'),
      serveRoot: '/content',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    FilmsService,
    OrderService,
    {
      provide: 'IFilmsRepository',
      useClass: TypeOrmFilmsRepository,
    },
  ],
  exports: [TypeOrmFilmsRepository, TypeOrmModule],
})
export class DatabaseModule {}