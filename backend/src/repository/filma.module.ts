import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './films.schema';
import { FilmsService } from '../films/films.service';
import { FilmsRepository } from './films.repository';
import { FilmsController } from '../films/films.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    ],
    controllers: [FilmsController],
    providers: [FilmsService, FilmsRepository],
    exports: [FilmsService], 
})
export class FilmsModule {}