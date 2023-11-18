/* eslint-disable prettier/prettier */
import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @Column({ nullable: false })
    brand: string;

    @Column({ nullable: false })
    avaliable: string;

    @Column({ nullable: false })
    size: string;

    @Column()
    image: string;

    @Column({ unique: true, nullable: false })
    description: string;

    @Column({ nullable: false})
    price: number;

    @ManyToOne(() => Category, (category) => category.id)
    category: Category;

    @Column({ nullable: false})
    stock: number;

    @Column()
    views: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAdd: Date;
}