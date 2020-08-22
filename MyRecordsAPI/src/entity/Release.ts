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
import { Country } from './Country';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ name: 'format_details' })
  formatDetails!: string;

  @Column()
  catno!: string;

  @ManyToOne((type) => Country, (country) => country.releases)
  @JoinColumn({ name: 'country_id' })
  country!: Country;

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
