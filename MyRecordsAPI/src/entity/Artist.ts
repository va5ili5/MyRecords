import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Release } from './Release';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  profile!: string;

  @ManyToMany((type) => Release)
  @JoinTable({
    name: 'release_artist',
    joinColumn: { name: 'release_id' },
  })
  releases!: Release[];
}
