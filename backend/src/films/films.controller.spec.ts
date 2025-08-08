import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const filmsServiceMock = {
    getFilms: jest.fn(),
    fetchFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsServiceMock,
        },
      ],
    }).compile();

    filmsController = testingModule.get<FilmsController>(FilmsController);
    filmsService = testingModule.get<FilmsService>(FilmsService);
  });

  describe('getFilms', () => {
    it('возвращает список', async () => {
      const mockFilms: FilmsResponseDto = {
        total: 2,
        items: [
          {
            id: '1',
            title: 'Film 1',
            rating: 8.5,
            director: 'Director 1',
            tags: ['драма'],
            about: '1',
            description: 'Описание 1',
            image: 'image1.jpg',
            cover: 'cover1.jpg',
          },
          {
            id: '2',
            title: 'Film 2',
            rating: 7.8,
            director: 'Director 2',
            tags: ['комедия'],
            about: '2',
            description: 'Описание 2',
            image: 'image2.jpg',
            cover: 'cover2.jpg',
          },
        ],
      };

      filmsServiceMock.getFilms.mockResolvedValue(mockFilms);
      const response = await filmsController.fetchFilms();
      expect(filmsService.fetchFilms).toHaveBeenCalled();
      expect(response).toEqual(mockFilms);
    });
  });

  describe('fetchFilmSchedule', () => {
    it('возвращает расписание фильма по id', async () => {
      const filmId = '1';
      const mockSchedule: ScheduleResponseDto = {
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

      filmsServiceMock.fetchFilmSchedule.mockResolvedValue(mockSchedule);

      const response = await filmsController.fetchFilmSchedule(filmId);

      expect(filmsService.fetchFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(response).toEqual(mockSchedule);
    });
  });
});