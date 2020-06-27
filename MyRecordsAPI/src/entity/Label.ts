import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Release } from './Release';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column({
    length: 50,
  })
  catno!: string;

  @OneToMany((type) => Release, (release) => release.label)
  releases!: Release[];
}
