import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/fileupload/images';

  constructor(private http: HttpClient) { }

  getProducts() {
    console.log(this.apiUrl)
    return this.http.get(this.apiUrl);
  }
}
