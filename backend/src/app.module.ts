import { Module, DynamicModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import * as dotenv from 'dotenv';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { TypeOrmFilmsRepository } from './repository/films.repository';
import { DatabaseModule } from './database/database.module';

dotenv.config();

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const baseImports = [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      ServeStaticModule.forRoot({
        rootPath: path.join(__dirname, '..', 'public', 'content'),
        serveRoot: '/content',
      }),
    ];

    const imports = [...baseImports, DatabaseModule];

    return {
      module: AppModule,
      imports,
      controllers: [FilmsController, OrderController],
      providers: [
        configProvider,
        FilmsService,
        OrderService,
        {
          provide: 'IFilmsRepository',
          useClass: TypeOrmFilmsRepository,
        },
      ],
    };
  }
}
