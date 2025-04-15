import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMicrophone,
  faPencil,
  faCross,
  faFaceSmile,
  faGraduationCap,
  faWandMagicSparkles,
  faQuoteLeft,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import { BodyComponent } from '../body/body.component';
@Component({
  selector: 'app-welcome',
  imports: [FontAwesomeModule, BodyComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  famicrochip = faMicrophone;
  faPencil = faPencil;
  facross = faCross;
  fafacesmile = faFaceSmile;
  fagraduationcap = faGraduationCap;
  fawandmagicsparkles = faWandMagicSparkles;
  faquoteleft = faQuoteLeft;
  faquoteright = faQuoteRight;
}
