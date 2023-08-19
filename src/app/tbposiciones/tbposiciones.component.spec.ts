import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBposicionesComponent } from './tbposiciones.component';

describe('TBposicionesComponent', () => {
  let component: TBposicionesComponent;
  let fixture: ComponentFixture<TBposicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TBposicionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TBposicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
