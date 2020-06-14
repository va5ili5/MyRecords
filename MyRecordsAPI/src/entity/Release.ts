import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Label } from './Label';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne((type) => Label, (label) => label.releases)
  label!: Label;
}
