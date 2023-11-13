import { Component } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/user.interface.login';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: UserLogin = {
    email: '',
    password: ''
  }

  constructor(private authservice: AuthserviceService, private router: Router) {};

  loginUser() {
    this.authservice.loginUser(this.user).subscribe( (response) => {
      console.log('usuario logueado', response);
      this.router.navigate(['']);
    }, (err) => {
      console.log('ocurrio un error', err);
    }) 
  }

}
