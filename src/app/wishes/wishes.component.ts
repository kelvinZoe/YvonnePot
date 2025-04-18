import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faQuoteLeft,
  faQuoteRight,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../loader/loader.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-wishes',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    LoaderComponent,
    NgbToastModule,
    LoadingComponent,
  ],
  templateUrl: './wishes.component.html',
  styleUrl: './wishes.component.scss',
})
export class WishesComponent {
  private fb = inject(FirebaseService);
  wishes: any[] = [];
  isLoading: boolean = true;
  faquoteleft = faQuoteLeft;
  faquoteright = faQuoteRight;
  farupright = faArrowUpRightFromSquare;
  unauthorized: boolean = false;
  signingOut: boolean = false;
  ngOnInit() {
    //scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);

    this.fb
      .getItems()
      .then((data) => {
        this.wishes = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.unauthorized = true;
      });
  }

  logout() {
    this.fb.signOut().then(() => {
      this.signingOut = false;
      this.unauthorized = true;
      this.wishes = [];
    });
  }
}
