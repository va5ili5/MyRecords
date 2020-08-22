import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Release } from './Release';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  iso!: string;

  @OneToMany((type) => Release, (release) => release.country)
  releases!: Release[];
}
