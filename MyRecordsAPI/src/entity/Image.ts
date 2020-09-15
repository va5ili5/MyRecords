import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Release } from './Release';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'bytea',
  })
  data!: Buffer;

  @Column()
  mimeType!: string;

  @ManyToOne((type) => Release, (release) => release.images)
  release!: Release;
}
