import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiadejuegoComponent } from './guiadejuego.component';

describe('GuiadejuegoComponent', () => {
  let component: GuiadejuegoComponent;
  let fixture: ComponentFixture<GuiadejuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiadejuegoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiadejuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
