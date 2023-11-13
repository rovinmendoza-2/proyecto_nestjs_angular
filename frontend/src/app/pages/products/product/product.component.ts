import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  images: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getFile().subscribe(((result) => {
      console.log(result);
      this.images = result;
      console.log("images", this.images.file);
    }));
  }
}
