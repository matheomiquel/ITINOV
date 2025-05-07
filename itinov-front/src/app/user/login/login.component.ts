import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { User } from '../../shared/model/user';
import { Login } from '../../shared/store/shared.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public userFormGroup: UntypedFormGroup;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly router: Router) {
    this.userFormGroup = this.formBuilder.group({
      email: ['matheo@gmail.com', [Validators.required]],
      password: ['password', [Validators.required]],
    })
    this._snackBar.open("el toto")
  }

  public login() {
    const user: User = {
      email: this.userFormGroup.get('email')?.value,
      password: this.userFormGroup.get('password')?.value
    }
    this.store.dispatch(new Login(user.email, user.password)).subscribe({
      next: () => this.router.navigate(["/movies"]),
      error: () => this._snackBar.open("el toto")
    });
  }
}
