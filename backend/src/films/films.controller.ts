import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async fetchFilms(): Promise<FilmsResponseDto> {
    return this.filmsService.fetchFilms();
  }

  @Get(':id/schedule')
  async fetchFilmSchedule(
    @Param('id') id: string,
  ): Promise<ScheduleResponseDto> {
    return this.filmsService.fetchFilmSchedule(id);
  }
}

