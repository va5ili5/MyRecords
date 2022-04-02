import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn } from 'typeorm';
import { Artist } from './Artist';
import { Release } from './Release';

@Entity()
@Index(["release_id", "position"], { unique: true })
export class Song {
  @PrimaryColumn()
  position!: number;
  
  @Column()
  title!: string;

  @Column()
  length!: string;

  @PrimaryColumn()
  release_id!: number;

  // @PrimaryColumn()
  // artist_id!: number;

  @ManyToOne(() => Release, (release) => release.songs)
  @JoinColumn({ name: 'release_id' })
  release!: Release;

  // @ManyToOne(() => Artist, (artist) => artist.songs)
  // @JoinColumn({ name: 'artist_id' })
  // artist!: Artist;
}