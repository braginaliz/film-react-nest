import { Injectable, Inject } from '@nestjs/common';
import { FilmsResponseDto, 
        ScheduleResponseDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async fetchFilms(): Promise<FilmsResponseDto> {
    return this.filmsRepository.getAllFilms();
  }

  async fetchFilmSchedule(id: string): Promise<ScheduleResponseDto> {
    return this.filmsRepository.getSessionsByFilmId(id);
  }
}
