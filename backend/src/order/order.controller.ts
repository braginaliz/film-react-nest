import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  TicketOrderDto,
  TicketOrderResponseDto,
  ErrorDto,
} from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() orders: TicketOrderDto[],
  ): Promise<TicketOrderResponseDto | ErrorDto> {
    if (!orders || !Array.isArray(orders)) {
      return this.handleValidationError(
        !orders
          ? 'Тело запроса не может быть пустым'
          : 'Ожидается массив заказов',
      );
    }

    return this.orderService.createOrder(orders);
  }

  private handleValidationError(message: string): ErrorDto {
    return {
      total: 0,
      items: [],
      error: message,
    };
  }
}
