import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { ProductComponent } from './pages/products/product/product.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HeaderComponent } from './pages/header/header.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'images', component: ProductComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'sider', component: SidebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
