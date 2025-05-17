import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAusenciaComponent } from './registro-ausencia.component';

describe('RegistroAusenciaComponent', () => {
  let component: RegistroAusenciaComponent;
  let fixture: ComponentFixture<RegistroAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAusenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
