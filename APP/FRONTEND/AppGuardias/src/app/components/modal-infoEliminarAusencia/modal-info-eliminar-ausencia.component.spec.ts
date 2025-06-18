import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoEliminarAusenciaComponent } from './modal-info-eliminar-ausencia.component';

describe('ModalInfoEliminarAusenciaComponent', () => {
  let component: ModalInfoEliminarAusenciaComponent;
  let fixture: ComponentFixture<ModalInfoEliminarAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoEliminarAusenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoEliminarAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
