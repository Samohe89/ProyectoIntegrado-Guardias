import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesGuardiaComponent } from './detalles-guardia.component';

describe('DetallesGuardiaComponent', () => {
  let component: DetallesGuardiaComponent;
  let fixture: ComponentFixture<DetallesGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesGuardiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
