/* eslint-disable prettier/prettier */

import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class LocalFile {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  filename: string;
 
  @ManyToOne(() => Product, (product) => product.image)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
 
export default LocalFile;