import { Component } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  userData: UserModel = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  onLogin() {
    console.log(this.userData);
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }
}
