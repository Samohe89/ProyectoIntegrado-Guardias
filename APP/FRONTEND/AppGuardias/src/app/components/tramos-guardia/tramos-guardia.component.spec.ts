import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramosGuardiaComponent } from './tramos-guardia.component';

describe('TramosGuardiaComponent', () => {
  let component: TramosGuardiaComponent;
  let fixture: ComponentFixture<TramosGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramosGuardiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramosGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
