//TODO реализовать DTO для /orders

import { IsString, 
    IsNumber, 
    IsOptional, 
    IsArray } from 'class-validator';

export class TicketOrderDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsOptional()
  @IsString()
  daytime?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}

export class TicketItemDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;

  @IsString()
  id: string;
}

export class TicketOrderResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: TicketItemDto[];

  @IsOptional()
  @IsString()
  error?: string;
}

export class ErrorDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: never[];

  @IsString()
  error: string;
}
