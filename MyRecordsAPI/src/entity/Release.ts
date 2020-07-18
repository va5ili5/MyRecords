import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Label } from './Label';
import { Artist } from './Artist';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne((type) => Label, (label) => label.releases)
  @JoinColumn({ name: 'label_id' })
  label!: Label;

  @ManyToMany((type) => Artist)
  @JoinTable({ name: 'release_artist' })
  artists!: Artist[];
}
