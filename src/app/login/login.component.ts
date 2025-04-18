import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    NgbToastModule,
    RouterModule,
    LoaderComponent,
    LoadingComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  registerMode: boolean = false;

  private auth = inject(FirebaseService);
  showToast: boolean = false;
  toastMessage: { isError: boolean; message: string } = {
    isError: false,
    message: '',
  };

  isLoading: boolean = false;
  constructor(private router: Router) {}

  onSubmit() {
    if (this.registerMode) {
      this.onRegister();
    } else {
      this.onLogin();
    }
  }
  onRegister() {
    this.isLoading = true;
    if (this.password !== this.confirmPassword) {
      this.isLoading = false;
      this.errorMessage = 'Passwords do not match.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }

    if (!this.email || !this.password) {
      this.isLoading = false;
      this.errorMessage = 'Please fill in all fields.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }

    if (
      this.email.includes('hackmanyvonne1@gmail.com') ||
      this.email.includes('zoeinventions@gmail.com')
    ) {
      this.auth
        .signUp(this.email, this.password)
        .then(() => {
          this.isLoading = false;
          this.successMessage = 'Registration successful!';
          this.showToastMessage(this.successMessage, false);
        })
        .catch((error) => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed: ' + error.message;
          this.showToastMessage(this.errorMessage, true);
        });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Sorry, you cannot create an account.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }
  }

  onLogin() {
    this.isLoading = true;
    // Call your Firebase authentication service here
    // Example: this.firebaseService.signIn(this.email, this.password);
    if (!this.email || !this.password) {
      this.isLoading = false;
      this.errorMessage = 'Please fill in all fields.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }
    this.auth
      .signIn(this.email, this.password)
      .then(() => {
        this.isLoading = false;
        this.successMessage = 'Login successful!';
        this.showToastMessage(this.successMessage, false);
        this.router.navigate(['/']); // Navigate to the wishes page
      })
      .catch((error) => {
        this.isLoading = false;
        if (error.message.includes('auth/invalid-email')) {
          this.errorMessage = 'Sorry, you are not registered.';
        } else if (error.message.includes('auth/invalid-credential')) {
          this.errorMessage = 'Sorry, you are not registered.';
        } else if (error.message === ' Login failed: auth/wrong-password') {
          this.errorMessage = 'Incorrect password.';
        }
        this.showToastMessage(this.errorMessage, true);
      });
  }

  showToastMessage(message: string, isError: boolean) {
    this.toastMessage = { isError, message };
    this.showToast = true;
  }
  closeToast() {
    this.showToast = false;
  }
}
