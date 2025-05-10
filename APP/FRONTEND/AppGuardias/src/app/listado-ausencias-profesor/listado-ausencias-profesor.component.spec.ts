import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAusenciasProfesorComponent } from './listado-ausencias-profesor.component';

describe('ListadoAusenciasProfesorComponent', () => {
  let component: ListadoAusenciasProfesorComponent;
  let fixture: ComponentFixture<ListadoAusenciasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAusenciasProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoAusenciasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
