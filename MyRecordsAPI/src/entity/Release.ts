import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Label } from './Label';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne((type) => Label, (label) => label.releases)
  @JoinColumn({ name: 'label_id' })
  label!: Label;
}
