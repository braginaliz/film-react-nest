import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    fetchFilms: jest.fn(() => Promise.resolve({ films: [], total: 0, items: [] } as FilmsResponseDto)),
    fetchFilmSchedule: jest.fn(() => Promise.resolve({ schedule: [], total: 0, items: [] } as ScheduleResponseDto)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmsController).toBeDefined();
  });

  describe('fetchFilms', () => {
    it('should return an array of films', async () => {
      const result = await filmsController.fetchFilms();
      expect(result).toEqual({ films: [], total: 0, items: [] });
      expect(filmsService.fetchFilms).toHaveBeenCalled();
    });
  });

  describe('fetchFilmSchedule', () => {
    it('should return the schedule for a film', async () => {
      const filmId = '1';
      const result = await filmsController.fetchFilmSchedule(filmId);
      expect(result).toEqual({ schedule: [], total: 0, items: [] });
      expect(filmsService.fetchFilmSchedule).toHaveBeenCalledWith(filmId);
    });
  });
});