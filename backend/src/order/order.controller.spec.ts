import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {
  TicketOrderDto,
  TicketOrderResponseDto,
  ErrorDto,
} from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should handle empty request body', async () => {
      const result = await orderController.createOrder(undefined);
      expect(result).toEqual({
        total: 0,
        items: [],
        error: 'Тело запроса не может быть пустым',
      });
      expect(mockOrderService.createOrder).not.toHaveBeenCalled();
    });

    it('should handle non-array request body', async () => {
      const result = await orderController.createOrder({} as any);
      expect(result).toEqual({
        total: 0,
        items: [],
        error: 'Ожидается массив заказов',
      });
      expect(mockOrderService.createOrder).not.toHaveBeenCalled();
    });

    it('should call orderService.createOrder with valid orders', async () => {
      const orders: TicketOrderDto[] = [
        {
          film: 'Film 1',
          session: 'session-1',
          row: 1,
          seat: 1,
        },
      ];
      const response: TicketOrderResponseDto = {
        total: 1,
        items: [],
      };
      mockOrderService.createOrder.mockResolvedValue(response);

      const result = await orderController.createOrder(orders);
      expect(result).toEqual(response);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(orders);
    });

    it('should return error when orderService.createOrder returns an error', async () => {
      const orders: TicketOrderDto[] = [
        {
          film: 'Film 1',
          session: 'session-1',
          row: 1,
          seat: 1,
        },
      ];
      const errorResponse: ErrorDto = {
        total: 0,
        items: [],
        error: 'Список пуст',
      };
      mockOrderService.createOrder.mockResolvedValue(errorResponse);

      const result = await orderController.createOrder(orders);
      expect(result).toEqual(errorResponse);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(orders);
    });
  });
});
