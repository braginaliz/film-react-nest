import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Film } from '../entity/efilm';
import { Schedule } from 'src/entity/eschedule';
import { TypeOrmFilmsRepository } from 'src/repository/films.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'prac'),
        password: configService.get<string>('DATABASE_PASSWORD', 'prac'),
        database: configService.get<string>('DATABASE_NAME', 'prac'),
        entities: [Film, Schedule],
        synchronize: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  providers: [
    {
      provide: 'IFilmsRepository',
      useClass: TypeOrmFilmsRepository,
    },
  ],
  exports: ['IFilmsRepository', TypeOrmModule],
})
export class DatabaseModule {}
