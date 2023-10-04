/* eslint-disable prettier/prettier */
import { Role } from '../../common/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable: false})
  name: string;
  @Column()
  lastName: string;
  @Column({unique: true, nullable: false})
  email: string;
  @Column({nullable: false, select: false})
  password: string;
  @Column({unique: true})
  number: number;
  @Column({ type: 'enum', default: Role.ADMIN, enum: Role })
  role: Role;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
