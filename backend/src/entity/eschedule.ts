import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './efilm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string; // идентификатор

  @Column({ type: 'uuid' })
  filmId: string; // идентификатор фильма, связанного с расписанием

  @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @Column({ type: 'varchar', length: 300 })
  daytime: string; // дата и время

  @Column({ type: 'int' })
  hall: number; // зал

  @Column({ type: 'int' })
  rows: number; // ряды

  @Column({ type: 'int' })
  seats: number; // места

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // цена билета

  @Column({ type: 'text', array: true, default: [] })
  taken: string[]; // забронированные места
  length: number;
  map: any;
}
