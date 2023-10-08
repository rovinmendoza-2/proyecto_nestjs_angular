/* eslint-disable prettier/prettier */
import { Category } from "src/categories/entities/category.entity";
import LocalFile from "src/localfiles/entities/localFile.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true, nullable: false})
    name: string;
    @Column({unique: true, nullable: false})
    description: string;
    @Column()
    price: number;
    @ManyToOne(() => Category, (category) => category.id)
    category: Category;
    @Column()
    stock: number;
    @Column()
    views: number;
    @OneToMany(() => LocalFile, (image) => image.id)
    image: LocalFile;
}