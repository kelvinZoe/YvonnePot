import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, NgbToastModule, RouterModule],
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
  constructor() {}

  onSubmit() {
    if (this.registerMode) {
      this.onRegister();
    } else {
      this.onLogin();
    }
  }
  onRegister() {
    console.log('Registering user:', this.email, this.password);
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      this.errorMessage = 'Passwords do not match.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }

    if (!this.email || !this.password) {
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
          this.successMessage = 'Registration successful!';
          this.showToastMessage(this.successMessage, false);
        })
        .catch((error) => {
          this.errorMessage = 'Registration failed: ' + error.message;
          this.showToastMessage(this.errorMessage, true);
        });
    } else {
      this.errorMessage = 'Sorry, you cannot create an account.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }
    // this.auth
    //   .signUp(this.email, this.password)
    //   .then(() => {
    //     this.successMessage = 'Registration successful!';
    //     this.showToastMessage(this.successMessage, false);
    //   })
    //   .catch((error) => {
    //     this.errorMessage = 'Registration failed: ' + error.message;
    //     this.showToastMessage(this.errorMessage, true);
    //   });
    // Call your Firebase authentication service here
    // Example: this.firebaseService.signUp(this.email, this.password);
  }

  onLogin() {
    // Call your Firebase authentication service here
    // Example: this.firebaseService.signIn(this.email, this.password);
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      this.showToastMessage(this.errorMessage, true);
      return;
    }
    this.auth
      .signIn(this.email, this.password)
      .then(() => {
        this.successMessage = 'Login successful!';
        this.showToastMessage(this.successMessage, false);
      })
      .catch((error) => {
        console.log('Login error:', error);
        if (error.message.includes('auth/invalid-email')) {
          this.errorMessage = 'Sorry, Invalid email address.';
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
}
