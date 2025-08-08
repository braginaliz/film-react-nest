import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { TypeOrmFilmsRepository } from '../repository/films.repository';
import {
  TicketOrderDto,
  TicketOrderResponseDto,
  ErrorDto,
} from './dto/order.dto';

describe('OrderService', () => {
  let orderService: OrderService;
  let filmsRepository: TypeOrmFilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'IFilmsRepository',
          useValue: {
            getSessionById: jest.fn(),
            markSessionAsTaken: jest.fn(),
          },
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    filmsRepository = module.get<TypeOrmFilmsRepository>('IFilmsRepository');
  });

  describe('createOrder', () => {
    it('should return an error when orders list is invalid', async () => {
      const result: ErrorDto = { total: 0, items: [], error: 'Список пуст' };
      const response = await orderService.createOrder([]);
      expect(response).toEqual(result);
    });

    it('should return an error if row and seat are invalid', async () => {
      const orders: TicketOrderDto[] = [
        { film: 'Film1', session: 'session1', row: -1, seat: -1 },
      ];
      const result: ErrorDto = {
        total: 0,
        items: [],
        error: 'Номер ряда и место должны быть положительными целыми числами',
      };

      const response = await orderService.createOrder(orders);
      expect(response).toEqual(result);
    });

    it('should return an error if seat is already taken', async () => {
      const orders: TicketOrderDto[] = [
        { film: 'Film1', session: 'session1', row: 1, seat: 1 },
      ];
      jest.spyOn(filmsRepository, 'getSessionById').mockResolvedValue({
        rows: 2,
        seats: 2,
        taken: [],
        daytime: '2024-07-18T12:00:00Z',
        price: 100,
        id: 'sessionId',
        hall: 1,
      });

      const result: ErrorDto = {
        total: 0,
        items: [],
        error: 'Место 1:1 занято',
      };
      const response = await orderService.createOrder(orders);
      expect(response).toEqual(result);
    });

    it('should successfully create order and return TicketOrderResponseDto', async () => {
      const orders: TicketOrderDto[] = [
        { film: 'Film1', session: 'session1', row: 1, seat: 1 },
      ];
      const sessionMock = {
        rows: 2,
        seats: 2,
        taken: [],
        daytime: '2024-07-18T12:00:00Z',
        price: 100,
        id: 'sessionId',
        hall: 1,
      };

      jest
        .spyOn(filmsRepository, 'getSessionById')
        .mockResolvedValue(sessionMock);
      jest.spyOn(filmsRepository, 'markSessionAsTaken').mockResolvedValue(true);

      const response: TicketOrderResponseDto =
        await orderService.createOrder(orders);
      expect(response.total).toBe(1);
      expect(response.items).toHaveLength(1);
      expect(response.items[0]).toHaveProperty('film', 'Film1');
      expect(response.items[0]).toHaveProperty('session', 'session1');
      expect(response.items[0]).toHaveProperty('row', 1);
      expect(response.items[0]).toHaveProperty('seat', 1);
    });
  });
});
