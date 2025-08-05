import { Module} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { DatabaseModule } from './database/database.module';
import { configProvider } from './app.config.provider';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content'),
      serveRoot: '/content',
    }),
    DatabaseModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService, configProvider],
})
export class AppModule {}