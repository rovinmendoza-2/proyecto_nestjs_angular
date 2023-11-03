import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Categories', routerLink: '/categories' },
      { label: 'Login', routerLink: '/login' },
      { label: 'Register', routerLink: '/register' }
    ];
  };

  
}
