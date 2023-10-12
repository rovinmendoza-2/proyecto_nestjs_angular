/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  data: Buffer;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
}