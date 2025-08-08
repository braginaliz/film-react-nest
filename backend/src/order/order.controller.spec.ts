import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TicketOrderDto, TicketOrderResponseDto, ErrorDto } from './dto/order.dto';

describe('OrderController Unit Tests', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  const orderServiceMock = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderServiceMock,
        },
      ],
    }).compile();

    orderController = moduleRef.get<OrderController>(OrderController);
    orderService = moduleRef.get<OrderService>(OrderService);
  });

  describe('createOrder method', () => {
    it('should successfully create an order with valid data', async () => {
      const orderData: TicketOrderDto[] = [{
        film: '1',
        session: '1',
        row: 1,
        seat: 1,
        daytime: '10:00',
        price: 500,
      }];

      const responseMock: TicketOrderResponseDto = {
        total: 1000,
        items: [{
          film: '1',
          session: '1',
          daytime: '10:00',
          row: 1,
          seat: 1,
          price: 500,
          id: 'order-1',
        }],
      };

      orderServiceMock.createOrder.mockResolvedValue(responseMock);

      const result = await orderController.createOrder(orderData);

      expect(orderService.createOrder).toHaveBeenCalledWith(orderData);
      expect(result).toEqual(responseMock);
    });

    it('should return an error when the request body is empty', async () => {
      const result = await orderController.createOrder(null as unknown as TicketOrderDto[]);

      const errorResponse: ErrorDto = {
        total: 0,
        items: [],
        error: 'Тело запроса не может быть пустым',
      };

      expect(result).toEqual(errorResponse);
    });

    it('should return an error for invalid data format', async () => {
      const result = await orderController.createOrder('invalid' as unknown as TicketOrderDto[]);

      const errorResponse: ErrorDto = {
        total: 0,
        items: [],
        error: 'Ожидается массив заказов',
      };

      expect(result).toEqual(errorResponse);
    });

    it('should return an error if undefined is passed', async () => {
      const result = await orderController.createOrder(undefined as unknown as TicketOrderDto[]);

      const errorResponse: ErrorDto = {
        total: 0,
        items: [],
        error: 'Тело запроса не может быть пустым',
      };

      expect(result).toEqual(errorResponse);
    });

    it('should return an error when an empty array is provided', async () => {
      const emptyOrders: TicketOrderDto[] = [];
      const expectedEmptyResponse: TicketOrderResponseDto = {
        total: 0,
        items: [],
      };

      orderServiceMock.createOrder.mockResolvedValue(expectedEmptyResponse);

      const result = await orderController.createOrder(emptyOrders);

      expect(orderService.createOrder).toHaveBeenCalledWith(emptyOrders);
      expect(result).toEqual(expectedEmptyResponse);
    });
  });
});