import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  user: User = { name: '', lastName: '', email: '', password: '', number: 0}

  constructor(private userService: UsersService) {}

  onSubmit() {
    this.userService.registerUser(this.user).subscribe( (resolve) => {
      console.log(resolve);
    })
  }

}
