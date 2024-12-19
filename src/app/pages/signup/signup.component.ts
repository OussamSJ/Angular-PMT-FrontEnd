import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  signupError = false;
  isLoading = false;
  

  constructor(private authService: AuthService, private router: Router) {
    this.createForm();
  }

  private createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async onSubmit() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) return;
    this.isLoading = true;
    try {
      await this.authService.signup(this.signupForm.value.email, this.signupForm.value.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.signupError = true;
    } finally {
      this.isLoading = false;
    }
  }

  get password() {
    return this.signupForm.get('password') as FormControl;
  }

  get email() {
    return this.signupForm.get('email') as FormControl;
  }
}
