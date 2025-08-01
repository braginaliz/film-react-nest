import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';
import { CreateFilmDto, SessionDto } from '../films/dto/films.dto'

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async getAllFilms(): Promise<{ total: number; items: CreateFilmDto[] }> {
    const films = await this.filmModel.find().exec();
    const filmsDto = films.map(this.mapFilmToDto);

    return {
      total: films.length,
      items: filmsDto,
    };
  }

  async getSessionsByFilmId(
    filmId: string,
  ): Promise<{ total: number; items: SessionDto[] }> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();

    if (!film) {
      return { total: 0, items: [] };
    }

    const sessionsDto = film.schedule.map(this.mapSessionToDto);
    return {
      total: sessionsDto.length,
      items: sessionsDto,
    };
  }

  async getSessionById(sessionId: string): Promise<SessionDto | null> {
    const film = await this.filmModel
      .findOne({ 'schedule.id': sessionId })
      .exec();

    if (!film) {
      return null;
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    return session ? this.mapSessionToDto(session) : null;
  }

  async markSessionAsTaken(
    sessionId: string,
    takenSeats: string[],
  ): Promise<boolean> {
    const result = await this.filmModel
      .updateOne(
        { 'schedule.id': sessionId },
        { $set: { 'schedule.$.taken': takenSeats } },
      )
      .exec();

    return result.modifiedCount > 0;
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

  private mapSessionToDto(session: {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }): SessionDto {
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