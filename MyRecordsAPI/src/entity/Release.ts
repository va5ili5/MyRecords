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
import { Genre } from './Genre';
import { Style } from './Style';
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

  @ManyToOne(() => User, (user) => user.releases)
  @JoinColumn({ name: 'appuser_id' })
  user!: User;

  @ManyToOne(() => Country, (country) => country.releases)
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @ManyToOne(() => Label, (label) => label.releases)
  @JoinColumn({ name: 'label_id' })
  label!: Label;

  @ManyToOne(() => Format, (format) => format.releases)
  @JoinColumn({ name: 'format_id' })
  format!: Format;

  @OneToMany(() => Image, (image) => image.release)
  images!: Image[];

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable({
    name: 'release_artist',
    joinColumn: {
      name: 'release_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artist_id',
      referencedColumnName: 'id',
    },
  })
  artists!: Artist[];

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({
    name: 'release_genre',
    joinColumn: {
      name: 'release_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres!: Genre[];

  @ManyToMany(() => Style, { cascade: true })
  @JoinTable({
    name: 'release_style',
    joinColumn: {
      name: 'release_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'style_id',
      referencedColumnName: 'id',
    },
  })
  styles!: Style[];
}
