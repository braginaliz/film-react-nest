import { CreateFilmDto, SessionDto } from '../films/dto/films.dto'

export interface InterfaceFilmsRepository {
    getAllFilms(): Promise<{ total: number; items: CreateFilmDto[] }>;
    getSessionsByFilmId(
      filmId: string,
    ): Promise<{ total: number; items: SessionDto[] }>;
    getSessionById(sessionId: string): Promise<SessionDto | null>;
    markSessionAsTaken(sessionId: string, taken: string[]): Promise<boolean>;
  }