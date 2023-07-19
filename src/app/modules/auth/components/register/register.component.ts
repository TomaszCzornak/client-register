import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage = '';
  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      hobbies: new FormArray([new FormControl('')]),
    }
    // { updateOn: 'submit' }
  );

  constructor(private authService: AuthService, private router: Router) {}

  get controls() {
    return this.registerForm.controls;
  }

  get hobbies() {
    return this.registerForm.get('hobbies') as FormArray;
  }

  addControl() {
    this.hobbies.push(new FormControl(''));
  }

  removeControl(index: number) {
    this.hobbies.removeAt(index);
  }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    // this.registerForm.controls.email.disable();
    this.controls.email.addValidators(Validators.minLength(5));
  }

  // enableControl() {
  //   this.registerForm.controls.email.enable();
  // }

  onRegister() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/logowanie']);
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd';
      },
    });
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Musisz wpisać jakąś wartość';
    }
    if (control.hasError('minlength')) {
      return 'Za krótka wartość';
    }
    if (control.hasError('maxlength')) {
      return 'Za długa wartość';
    }
    return control.hasError('email') ? 'Niepoprawny email' : '';
  }
}
