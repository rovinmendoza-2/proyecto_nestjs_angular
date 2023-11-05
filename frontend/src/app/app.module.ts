import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/products/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/users/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    ImageModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
