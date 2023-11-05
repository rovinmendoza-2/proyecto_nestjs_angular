import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface.register';
import { UserService } from 'src/app/services/users/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isHidden: boolean = false;
  messages: any[] = [];

  userForm: FormGroup;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      number: [0, Validators.required],
    });
  }
  // Función para mostrar un mensaje y desaparecer después de un tiempo
  showMessageAndHide(severity: string, summary: string, detail: string, timeout: number = 5000) {
    this.messages = [{ severity, summary, detail }];

    // Elimina el mensaje después de 'timeout' milisegundos
    setTimeout(() => {
      this.clearMessages();
    }, timeout);
  }

  clearMessages() {
    this.messages = [];
  }

  registerUser() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      console.log(this.user);
      this.userService.registerUser(this.user).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito:', response);
          this.showMessageAndHide('success', 'Success', 'Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error.error.message);
          this.showMessageAndHide('error', 'Error', error.error.message);
        }
      );
    }
  }
}
