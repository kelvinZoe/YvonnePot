import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
    selector: 'app-body',
    imports: [NgbModule, ReactiveFormsModule],
    templateUrl: './body.component.html',
    styleUrl: './body.component.scss'
})
export class BodyComponent {
  active = 1;
  birthdayWishForm: FormGroup;

  constructor() {
    this.birthdayWishForm = new FormGroup({
      name: new FormControl(''),
      message: new FormControl('', [Validators.required]),
    });
  }
}
