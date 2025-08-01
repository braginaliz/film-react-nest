import { Injectable } from '@nestjs/common';
import {
  TicketOrderDto,
  TicketOrderResponseDto,
  TicketItemDto,
  ErrorDto,
} from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orders: TicketOrderDto[],
  ): Promise<TicketOrderResponseDto | ErrorDto> {
    if (!this.isValidOrderList(orders)) {
      return this.createErrorResponse('Список пуст');
    }

    const items: TicketItemDto[] = [];
    const processedSeats = new Set<string>();

    for (const order of orders) {
      const sanitizedOrder = this.sanitizeOrderDto(order);
      const result = await this.handleOrderItem(sanitizedOrder, processedSeats);

      if ('error' in result) {
        return this.createErrorResponse(result.error);
      }

      items.push(result);
      processedSeats.add(
        `${sanitizedOrder.session}:${result.row}:${result.seat}`,
      );
    }

    return this.createSuccessResponse(items);
  }

  private isValidOrderList(orders: TicketOrderDto[]): boolean {
    return Array.isArray(orders) && orders.length > 0;
  }

  private createErrorResponse(message: string): ErrorDto {
    return {
      total: 0,
      items: [],
      error: message,
    };
  }

  private createSuccessResponse(
    items: TicketItemDto[],
  ): TicketOrderResponseDto {
    return {
      total: items.length,
      items: items,
    };
  }

  private sanitizeOrderDto(orderDto: unknown): TicketOrderDto {
    if (!orderDto || typeof orderDto !== 'object') {
      return this.getDefaultOrderDto();
    }

    const dto = orderDto as Record<string, unknown>;
    return {
      film: typeof dto.film === 'string' ? dto.film : '',
      session: typeof dto.session === 'string' ? dto.session : '',
      row: typeof dto.row === 'number' ? dto.row : 0,
      seat: typeof dto.seat === 'number' ? dto.seat : 0,
    };
  }

  private getDefaultOrderDto(): TicketOrderDto {
    return {
      film: '',
      session: '',
      row: 0,
      seat: 0,
    };
  }

  private async handleOrderItem(
    orderDto: TicketOrderDto,
    processedSeats: Set<string>,
  ): Promise<TicketItemDto | { error: string }> {
    if (!this.isOrderDataValid(orderDto)) {
      return { error: 'Не хватает данных для оформления заказа' };
    }

    const row = Number(orderDto.row);
    const seat = Number(orderDto.seat);

    if (!this.isRowAndSeatValid(row, seat)) {
      return {
        error: 'Номер ряда и место должны быть положительными целыми числами',
      };
    }

    const requestSeatKey = `${orderDto.session}:${row}:${seat}`;
    if (processedSeats.has(requestSeatKey)) {
      return {
        error: `Место ${row}:${seat} уже существуют в этом запросе`,
      };
    }

    const session = await this.filmsRepository.getSessionById(orderDto.session);
    if (!session) {
      return { error: 'Сеанс не найден' };
    }

    if (row > session.rows || seat > session.seats) {
      return {
        error: `Места ${row}:${seat} не существует. В зале ${session.rows} рядов и ${session.seats} мест в ряду`,
      };
    }

    if (session.taken.includes(`${row}:${seat}`)) {
      return { error: `Место ${row}:${seat} занято` };
    }

    const updatedTaken = [...session.taken, `${row}:${seat}`];
    const success = await this.filmsRepository.markSessionAsTaken(
      orderDto.session,
      updatedTaken,
    );
    if (!success) {
      return { error: 'Ошибка при бронировании' };
    }

    return this.createOrderItem(orderDto, session, row, seat);
  }

  private isOrderDataValid(orderDto: TicketOrderDto): boolean {
    return Boolean(
      orderDto.film && orderDto.session && orderDto.row && orderDto.seat,
    );
  }

  private isRowAndSeatValid(row: number, seat: number): boolean {
    return (
      Number.isInteger(row) && Number.isInteger(seat) && row > 0 && seat > 0
    );
  }

  private createOrderItem(
    orderDto: TicketOrderDto,
    session: any,
    row: number,
    seat: number,
  ): TicketItemDto {
    return {
      film: orderDto.film,
      session: orderDto.session,
      daytime: session.daytime,
      row: row,
      seat: seat,
      price: session.price,
      id: this.generateUniqueOrderId(),
    };
  }

  private generateUniqueOrderId(): string {
    return `order-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }
}

