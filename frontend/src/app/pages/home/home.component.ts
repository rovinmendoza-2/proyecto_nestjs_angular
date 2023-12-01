import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { UserLogin } from '../../interfaces/user.interface.login';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Category } from '../../interfaces/product.interface.category';
import { Product } from '../../interfaces/product.interface.register';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  currentUser: UserLogin | null;
  visible: boolean = false;
  fileImage: string = '';
  userForm: FormGroup;

  category: Category[] = [];
  product: Product[] = [];

  productDto!: Product;
  imageFile!: File;

  value: number = 50;

  constructor(
    private authService: AuthserviceService,
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
    this.getProduct();

  };

  showDialog() {
    this.visible = true;
  };

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    console.log(this.imageFile);
  };

  async registerProduct() {
    if (this.userForm.valid && this.imageFile) {
      this.productDto = this.userForm.value;
      console.log(this.productDto);
      this.productService.createProduct(this.productDto, this.imageFile);
      // Handle successful product creation
    } else {
      // Handle incomplete product data
    }
  }

  // registerProduct() {
  //   if (this.userForm.valid) {
      
  //   this.products = this.userForm.value;
  //   //this.products.image = this.fileImage;
  //   console.log(this.products);
    
  //   this.productService.createProduct(this.products).subscribe({
  //     next: (result) => {
  //       console.log('producto registrado con exito!', result);
  //     },
  //     error: (error) => {
  //       console.log('Ocurrio un error', error);
  //     }
  //   })
  //   }
  // };

  getCategory() {
    this.productService.getCategory().subscribe({
      next: (result) => {
        this.category = result;
        console.log(this.category);
      },
      error: (error) => {
        console.log('Error al obtener la categoría', error);
      }
    });
  };

  getProduct() {
    this.productService.getProduct().subscribe({
      next: (result) => {
        this.product = result;
        console.log(this.product);
      }, error: (error) => {
        console.log('Ocurrio un error', error);
      }
    })
  }

}
