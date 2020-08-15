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

  @Column()
  catno!: string;

  @ManyToOne((type) => Label, (label) => label.releases)
  @JoinColumn({ name: 'label_id' })
  label!: Label;

  @ManyToMany((type) => Artist)
  @JoinTable({
    name: 'release_artist',
    joinColumn: {
      name: 'artist_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'release_id',
      referencedColumnName: 'id',
    },
  })
  artists!: Artist[];
}
