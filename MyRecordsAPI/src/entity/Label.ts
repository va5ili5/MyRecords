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

  @Column()
  name!: string;

  @Column()
  profile!: string;

  @Column()
  url!: string;

  @OneToMany(() => Release, (release) => release.label)
  releases!: Release[];
}
