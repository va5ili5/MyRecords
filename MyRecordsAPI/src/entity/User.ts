import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Release } from './Release';

@Entity('appuser')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'email', nullable: false, unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Length(2, 30, {
    message:
      'The password must be at least 2 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  password!: string;

  @Column()
  @Length(2, 30, {
    message:
      'The username must be at least 2 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The username is required' })
  username!: string;

  @Column()
  // @Length(2, 30, {
  //   message:
  //     'The firstname must be at least 2 but not longer than 30 characters',
  // })
  //@IsNotEmpty({ message: 'The firstname is required' })
  firstname!: string;

  @Column()
  // @Length(2, 30, {
  //   message: 'The name must be at least 2 but not longer than 30 characters',
  // })
  //@IsNotEmpty({ message: 'The name is required' })
  lastname!: string;

  @OneToMany((type) => Release, (release) => release.user)
  releases!: Release[];
}
