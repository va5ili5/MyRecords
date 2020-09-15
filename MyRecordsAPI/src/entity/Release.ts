import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Label } from './Label';
import { Artist } from './Artist';
import { Country } from './Country';
import { User } from './User';
import { Format } from './Format';
import { Image } from './Image';
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

  @Column({ name: 'release_date' })
  releaseDate!: Date;

  @Column({ name: 'create_date' })
  createDate!: Date;

  @ManyToOne((type) => User, (user) => user.releases)
  @JoinColumn({ name: 'appuser_id' })
  user!: User;

  @ManyToOne((type) => Country, (country) => country.releases)
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @ManyToOne((type) => Label, (label) => label.releases)
  @JoinColumn({ name: 'label_id' })
  label!: Label;

  @ManyToOne((type) => Format, (format) => format.releases)
  @JoinColumn({ name: 'format_id' })
  format!: Format;

  @OneToMany((type) => Image, (image) => image.release)
  images!: Image[];

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
