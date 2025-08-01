import { Injectable, Inject } from '@nestjs/common';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';
import { InterfaceFilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('InterfaceFilmsRepository')
    private readonly filmsRepository: InterfaceFilmsRepository,
  ) {}

  async fetchFilms(): Promise<FilmsResponseDto> {
    return this.filmsRepository.getAllFilms();
  }

  async fetchFilmSchedule(id: string): Promise<ScheduleResponseDto> {
    return this.filmsRepository.getSessionsByFilmId(id);
  }
}
