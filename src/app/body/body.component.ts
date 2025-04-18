import { Component, inject } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WishesComponent } from '../wishes/wishes.component';
import { FirebaseService } from '../services/firebase.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    NgbModule,
    ReactiveFormsModule,
    WishesComponent,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  active = 1;
  birthdayWishForm: FormGroup;
  private fb = inject(FirebaseService);
  showToast: boolean = false;
  toastMessage: { isError: boolean; message: string } = {
    isError: false,
    message: '',
  };
  isLoading: boolean = false;

  constructor() {
    this.birthdayWishForm = new FormGroup({
      name: new FormControl(''),
      message: new FormControl('', [Validators.required]),
    });
  }

  addSampleData() {
    this.isLoading = true;
    const wish = {
      name: this.birthdayWishForm.value.name || 'Anonymous',
      message: this.birthdayWishForm.value.message,
    };

    if (!wish.message) {
      return;
    }

    this.fb
      .addItem(wish)
      .then((response) => {
        this.isLoading = false;
        this.showToastMessage('God bless you For the Wish!!!', false);
        this.birthdayWishForm.reset();
      })
      .catch((error) => {
        this.showToastMessage('Error adding wish. Please try again.', true);
        this.birthdayWishForm.reset();
      });
  }

  showToastMessage(message: string, isError: boolean) {
    this.toastMessage = { isError, message };
    this.showToast = true;
  }
}
