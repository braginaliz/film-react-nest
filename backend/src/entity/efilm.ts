import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './eschedule';
import { Column, OneToMany } from 'typeorm';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid') // идентификатор
  id: string;
  @Column({ type: 'varchar', length: 255 }) // Название
  title: string;
  @Column({ type: 'varchar', length: 255 }) // Режиссёр
  director: string;

  @Column({ type: 'text' }) // Подробное описание
  description: string;

  @Column({ type: 'text' }) // Краткое содержание
  about: string;

  @Column({ type: 'decimal', precision: 3, scale: 1 }) // Рейтинг
  rating: number;

  @Column({ type: 'varchar', length: 500 }) // URL изображения
  image: string;

  @Column({ type: 'varchar', length: 500 }) //  обложка
  cover: string;

  @Column({ type: 'text', array: true }) // магазация в массиве
  tags: string[];
  @OneToMany(() => Schedule, (schedule) => schedule.film) // Связь с графиком
  schedule: Schedule[];
}
