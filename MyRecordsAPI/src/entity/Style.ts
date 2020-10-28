import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Genre } from './Genre';

@Entity({name: 'style'})
export class Style {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Genre, (genre) => genre.styles)
  @JoinColumn({ name: 'genre_id' })
  genre!: Genre;
}