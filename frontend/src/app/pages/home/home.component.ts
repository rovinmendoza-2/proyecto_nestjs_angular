import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { UserLogin } from 'src/app/interfaces/user.interface.login';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { ProductService } from 'src/app/services/products/product.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  currentUser: UserLogin | null;
  visible: boolean = false;
  fileImage: string = '';
  userForm: FormGroup;

  product = {
    image: ''
  };

  category!: any[];

  constructor(
    private authService:AuthserviceService,
    private formBuilder: FormBuilder,
    private productService: ProductService) {

    this.currentUser = this.authService.getCurrentUser();
    console.log('usuario de home', this.currentUser);

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      avaliable: ['', Validators.required],
      size: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required]
    });
  };

  ngOnInit() {
    this.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Categories', routerLink: '/categories' },
      { label: 'Login', routerLink: '/login' },
      { label: 'Register', routerLink: '/register' }
    ];

    this.getCategory();
  };

  showDialog() {
    this.visible = true;
};

onFileSelected(event: any): void {
  const file = event.target.files[0];
  console.log(file.name);
  this.fileImage = file.name;
};

registerProduct() {
  this.product = this.userForm.value;
  this.product.image = this.fileImage;
  console.log(this.product);
  console.log(this.fileImage)
};

getCategory() {
  this.productService.getCategory().subscribe( (result) => {
    this.category = result;
    console.log(this.category)
  }, error => {
    console.log('Error al obtener la categoria', error);
  });
}

}
