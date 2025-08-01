//TODO описать DTO для запросов к /films
import { IsString, IsNumber, IsArray, IsOptional, IsDateString } from 'class-validator';

export class SessionDto {
    @IsString()
    id: string;
    @IsDateString()
    daytime: string;
    @IsNumber()
    hall: number;
    @IsNumber()
    rows: number;
    @IsNumber()
    seats: number;

    @IsNumber()
    price: number;
  
    @IsArray() 
    @IsString({ each: true })
    taken: string[]; 
  }
  
  export class ScheduleResponseDto {
    @IsNumber()
    total: number;
  
    @IsArray()
    items: SessionDto[];
  }

export class CreateFilmDto {
  @IsString()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray() 
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  @IsOptional() 
  image: string;

  @IsString()
  @IsOptional() 
  cover: string;

  @IsString()
  @IsOptional() 
  description: string;

}

export class FilmsResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: CreateFilmDto[];
}
