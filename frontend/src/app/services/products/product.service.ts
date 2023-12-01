import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface.register';
import { Category } from '../../interfaces/product.interface.category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiProductUrl = 'http://localhost:3000/products/create';
  private apiUrl = 'http://localhost:3000/categories';
  private apiGetProduct = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  // createProduct(product: Product, imageFile: File): Observable<any> {
  //   const formData = new FormData();

  //   formData.append('name', product.name);
  //   formData.append('price', product.price);
  //   formData.append('brand', product.brand);
  //   formData.append('category', product.category);
  //   formData.append('avaliable', product.avaliable);
  //   formData.append('description', product.description);
  //   formData.append('size', product.size);
  //   formData.append('stock', product.stock);
  //   formData.append('imagen', imageFile);
  //   console.log("formData", formData);

  //   const blob = new Blob([JSON.stringify(formData)], { type: 'application/json' });
  //   console.log('blob', blob)
  //   return this.http.post(this.apiProductUrl, blob);
  // }

  async createProduct(productDto: Product, imageFile: File) {
    console.log("service", productDto);
    const formData = new FormData();
    formData.append('name', productDto.name);
    formData.append('price', productDto.price);
    formData.append('brand', productDto.brand);
    formData.append('category', productDto.category);
    formData.append('avaliable', productDto.avaliable);
    formData.append('description', productDto.description);
    formData.append('size', productDto.size);
    formData.append('stock', productDto.stock);
    formData.append('imagen', imageFile);
    console.log("formData", formData)
    return this.http.post(this.apiProductUrl, formData).subscribe({
      next: (result) => {
        console.log('producto registrado con exito!', result);
      },
      error: (error) => {
        console.log('Ocurrio un error', error);
      }
    })
  }

  getCategory(): Observable<Category[]> {
    const category = this.http.get<Category[]>(this.apiUrl);
    return category;
  };

  getProduct(): Observable<Product[]> {
    const product = this.http.get<Product[]>(this.apiGetProduct);
    return product;
  }
}
