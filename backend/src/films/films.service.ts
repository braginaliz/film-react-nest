import { Injectable, Inject } from '@nestjs/common';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';
import { IFilmsRepository } from '../repository/films.repository.interface';

@Injectable()
export class FilmsService {
  constructor( @Inject('IFilmsRepository') 
   private readonly filmsRepository: IFilmsRepository) {}

  async fetchFilms(): Promise<FilmsResponseDto> {
    return this.filmsRepository.getAllFilms();
  }

  async fetchFilmSchedule(id: string): Promise<ScheduleResponseDto> {
    return this.filmsRepository.getSessionsByFilmId(id);
  }
}
