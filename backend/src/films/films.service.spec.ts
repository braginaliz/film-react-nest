import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { TypeOrmFilmsRepository } from '../repository/films.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: TypeOrmFilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: 'IFilmsRepository',
          useValue: {
            getAllFilms: jest.fn(),
            getSessionsByFilmId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    repository = module.get<TypeOrmFilmsRepository>('IFilmsRepository');
  });

  describe('fetchFilms', () => {
    it('should return an array of films', async () => {
      const result: FilmsResponseDto = { total: 2, items: [] };
      jest.spyOn(repository, 'getAllFilms').mockResolvedValue(result);

      expect(await service.fetchFilms()).toBe(result);
    });

    it('should call getAllFilms method of the repository', async () => {
      await service.fetchFilms();
      expect(repository.getAllFilms).toHaveBeenCalled();
    });
  });

  describe('fetchFilmSchedule', () => {
    it('should return the schedule for a specific film', async () => {
      const id = '1';
      const result: ScheduleResponseDto = { total: 1, items: [] };
      jest.spyOn(repository, 'getSessionsByFilmId').mockResolvedValue(result);

      expect(await service.fetchFilmSchedule(id)).toBe(result);
    });

    it('should call getSessionsByFilmId method of the repository with correct id', async () => {
      const id = '1';
      await service.fetchFilmSchedule(id);
      expect(repository.getSessionsByFilmId).toHaveBeenCalledWith(id);
    });
  });
});