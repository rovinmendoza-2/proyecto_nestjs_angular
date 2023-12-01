import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/user.interface.login';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup ;

  user: UserLogin = {
    email: '',
    password: ''
  }

  constructor(private authservice: AuthserviceService, private fb: FormBuilder, private router: Router) {};


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  loginUser() {
    this.authservice.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('usuario logueado', response);
        this.router.navigate(['']);
      }, error: (error) => {
        console.log('ocurrio un error', error);
      }
    })
  }

}
