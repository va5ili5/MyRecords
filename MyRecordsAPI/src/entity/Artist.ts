import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Release } from './Release';

@Entity({name: 'artist'})
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  profile!: string;
}
