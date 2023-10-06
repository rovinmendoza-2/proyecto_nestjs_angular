/* eslint-disable prettier/prettier */
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @Column({unique: true, nullable: false})
    images: string;
    @ManyToOne(() => Category, (category) => category.id)
    category: Category;
    @Column()
    stock: number;
    @Column()
    views: number;
}