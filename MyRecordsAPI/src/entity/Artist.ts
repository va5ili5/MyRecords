import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Release } from './Release';
import { Song } from './Song';

@Entity({name: 'artist'})
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  profile!: string;

  // @OneToMany((type) => Song, (song) => song.artist)
  // songs!: Song[];
}
