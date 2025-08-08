import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    getFilms: jest.fn(),
    fetchFilmSchedule: jest.fn(),
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

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('getFilms', () => {
    it('должен возвращать список фильмов', async () => {
      const expectedFilms: FilmsResponseDto = {
        total: 2,
        items: [
          {
            id: '1',
            title: 'Film 1',
            rating: 8.5,
            director: 'Director 1',
            tags: ['action', 'drama'],
            about: 'About film 1',
            description: 'Description of film 1',
            image: 'image1.jpg',
            cover: 'cover1.jpg',
          },
          {
            id: '2',
            title: 'Film 2',
            rating: 7.8,
            director: 'Director 2',
            tags: ['comedy'],
            about: 'About film 2',
            description: 'Description of film 2',
            image: 'image2.jpg',
            cover: 'cover2.jpg',
          },
        ],
      };

      mockFilmsService.getFilms.mockResolvedValue(expectedFilms);

      const result = await controller.fetchFilms();

      expect(service.fetchFilms).toHaveBeenCalled();
      expect(result).toEqual(expectedFilms);
    });
  });

  describe('fetchFilmSchedule', () => {
    it('должен возвращать расписание фильма по ID', async () => {
      const filmId = '1';
      const expectedSchedule: ScheduleResponseDto = {
        total: 1,
        items: [
          {
            id: '1',
            daytime: '10:00',
            hall: 1,
            rows: 10,
            seats: 100,
            price: 500,
            taken: ['A1', 'A2'],
          },
        ],
      };

      mockFilmsService.fetchFilmSchedule.mockResolvedValue(expectedSchedule);

      const result = await controller.fetchFilmSchedule(filmId);

      expect(service.fetchFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(expectedSchedule);
    });
  });

  describe('getFilmShedule', () => {
    it('должен возвращать расписание фильма по ID (альтернативный эндпоинт)', async () => {
      const filmId = '1';
      const expectedSchedule: ScheduleResponseDto = {
        total: 1,
        items: [
          {
            id: '1',
            daytime: '10:00',
            hall: 1,
            rows: 10,
            seats: 100,
            price: 500,
            taken: ['A1', 'A2'],
          },
        ],
      };

      mockFilmsService.fetchFilmSchedule.mockResolvedValue(expectedSchedule);

      const result = await controller.fetchFilmSchedule(filmId);

      expect(service.fetchFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(expectedSchedule);
    });
  });
});