import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserLogin } from 'src/app/interfaces/user.interface.login';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  currentUser: UserLogin | null;
  visible: boolean = false;

  constructor(private authService:AuthserviceService) {
    this.currentUser = this.authService.getCurrentUser();
    console.log('usuario de home', this.currentUser);
  };

  ngOnInit() {
    this.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Categories', routerLink: '/categories' },
      { label: 'Login', routerLink: '/login' },
      { label: 'Register', routerLink: '/register' }
    ];
  };

  showDialog() {
    this.visible = true;
}
}
