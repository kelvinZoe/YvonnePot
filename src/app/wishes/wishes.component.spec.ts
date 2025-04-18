import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesComponent } from './wishes.component';

describe('WishesComponent', () => {
  let component: WishesComponent;
  let fixture: ComponentFixture<WishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
