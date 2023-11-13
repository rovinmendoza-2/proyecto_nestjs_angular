import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/user.interface.login';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private urlApi = 'http://localhost:3000/api/auth/login';

  private currentUser: UserLogin | null = null;

  constructor(private http: HttpClient) { };

  loginUser(user: UserLogin): Observable<any>{
    this.currentUser = user;
    return this.http.post(this.urlApi, user);
  };

  getCurrentUser(): UserLogin | null {
    return this.currentUser;
  }
}
