import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Style } from './Style';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Style, (style) => style.genre)
  styles!: Style[];
}