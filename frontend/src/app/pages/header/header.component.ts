import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: "Ver perfil",
        icon: 'pi pi-user',
      },
      {
        label: "Edit perfil",
        icon: 'pi pi-user-edit',
      }
    ]
  };
}
