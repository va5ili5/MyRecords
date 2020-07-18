import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Release } from './Release';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column({
    length: 500,
  })
  profile!: string;

  @ManyToMany((type) => Release)
  @JoinTable({ name: 'release_artist' })
  releases!: Release[];
}
