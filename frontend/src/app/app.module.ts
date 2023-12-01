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
import { DialogModule } from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/products/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HeaderComponent } from './pages/header/header.component';

import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent
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
    MessagesModule,
    DialogModule,
    FileUploadModule,
    SidebarModule,
    ListboxModule,
    DividerModule,
    SliderModule,
    TieredMenuModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
