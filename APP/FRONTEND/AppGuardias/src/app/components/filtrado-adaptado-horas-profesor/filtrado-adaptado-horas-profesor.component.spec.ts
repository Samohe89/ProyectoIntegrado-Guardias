import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoAdaptadoHorasProfesorComponent } from './filtrado-adaptado-horas-profesor.component';

describe('FiltradoAdaptadoHorasProfesorComponent', () => {
  let component: FiltradoAdaptadoHorasProfesorComponent;
  let fixture: ComponentFixture<FiltradoAdaptadoHorasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltradoAdaptadoHorasProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltradoAdaptadoHorasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
