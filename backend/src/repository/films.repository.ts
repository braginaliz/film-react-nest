import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entity/efilm';
import { Schedule } from '../entity/eschedule';
import { CreateFilmDto, SessionDto } from '../films/dto/films.dto';

@Injectable()
export class TypeOrmFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async getAllFilms(): Promise<{ total: number; items: CreateFilmDto[] }> {
    const films = await this.filmRepository.find();
    const filmsDto = films.map(this.mapFilmToDto);

    return {
      total: films.length,
      items: filmsDto,
    };
  }

  async getSessionsByFilmId(filmId: string): Promise<{ total: number; items: SessionDto[] }> {
    const schedules = await this.scheduleRepository.find({
      where: { filmId },
    });
    
    return {
      total: schedules.length,
      items: schedules.map((schedule) => this.mapSessionToDto(schedule)),
    };
  }

  async getSessionById(sessionId: string): Promise<SessionDto | null> {
    const session = await this.scheduleRepository.findOne({
      where: { id: sessionId },
    });

    return session ? this.mapSessionToDto(session) : null;
  }

  async markSessionAsTaken(sessionId: string, taken: string[]): Promise<boolean> {
    const result = await this.scheduleRepository.update(
      { id: sessionId },
      { taken },
    );
    return result.affected ? result.affected > 0 : false;
  }

  private mapFilmToDto(film: Film): CreateFilmDto {
    const {
      id,
      rating,
      director,
      tags,
      title,
      about,
      description,
      image,
      cover,
    } = film;

    return {
      id,
      rating,
      director,
      tags,
      title,
      about,
      description,
      image,
      cover,
    };
  }

  private mapSessionToDto(session: Schedule): SessionDto {
    return {
      id: session.id,
      daytime: session.daytime,
      hall: Number(session.hall),
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken,
    };
  }
}