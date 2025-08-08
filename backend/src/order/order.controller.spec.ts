import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TicketOrderDto, TicketOrderResponseDto, ErrorDto } from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('createOrder', () => {
    it('should return an error if orders is not an array', async () => {
      const result = await orderController.createOrder(null);
      expect(result).toEqual({
        total: 0,
        items: [],
        error: 'Тело запроса не может быть пустым',
      });
    });

    it('should return an error if orders is an empty array', async () => {
      const result = await orderController.createOrder([]);
      expect(result).toEqual({
        total: 0,
        items: [],
        error: 'Ожидается массив заказов',
      });
    });

    it('should call createOrder of OrderService and return the response', async () => {
      const orders: TicketOrderDto[] = [
        { film: 'Film1', session: 'session1', row: 1, seat: 1 },
      ];
      const response: TicketOrderResponseDto = { total: 1, items: [] };
      
      jest.spyOn(orderService, 'createOrder').mockResolvedValue(response);

      const result = await orderController.createOrder(orders);
      expect(result).toBe(response);
      expect(orderService.createOrder).toHaveBeenCalledWith(orders);
    });
  });
});