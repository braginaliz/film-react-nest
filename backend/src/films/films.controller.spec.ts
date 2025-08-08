import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            fetchFilms: jest.fn(),
            fetchFilmSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('fetchFilms', () => {
    it('should return films', async () => {
      const result: FilmsResponseDto = { total: 2, items: [] };
      jest.spyOn(service, 'fetchFilms').mockResolvedValue(result);

      expect(await controller.fetchFilms()).toBe(result);
    });

    it('should call fetchFilms method of the service', async () => {
      await controller.fetchFilms();
      expect(service.fetchFilms).toHaveBeenCalled();
    });
  });

  describe('fetchFilmSchedule', () => {
    it('should return film schedule by ID', async () => {
      const id = '1';
      const result: ScheduleResponseDto = { total: 1, items: [] };
      jest.spyOn(service, 'fetchFilmSchedule').mockResolvedValue(result);

      expect(await controller.fetchFilmSchedule(id)).toBe(result);
    });

    it('should call fetchFilmSchedule method of the service with correct id', async () => {
      const id = '1';
      await controller.fetchFilmSchedule(id);
      expect(service.fetchFilmSchedule).toHaveBeenCalledWith(id);
    });
  });
});