import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../pages/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(user: User){
    const userRegister = this.http.post('http://localhost:3000/api/auth/register', user);
    return userRegister;
  }
}
