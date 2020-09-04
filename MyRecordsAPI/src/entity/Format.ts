import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Release } from './Release';

@Entity()
export class Format {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany((type) => Release, (release) => release.format)
  releases!: Release[];
}
