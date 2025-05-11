import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAusenciaProfesorComponent } from './registro-ausencia-profesor.component';

describe('RegistroAusenciaProfesorComponent', () => {
  let component: RegistroAusenciaProfesorComponent;
  let fixture: ComponentFixture<RegistroAusenciaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAusenciaProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAusenciaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
