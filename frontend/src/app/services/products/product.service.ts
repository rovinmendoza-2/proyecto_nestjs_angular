import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/categories';

  constructor(private httpClient: HttpClient) { }

  getCategory(): Observable<any> {
    const category = this.httpClient.get(this.apiUrl);
    return category;
  }
}
