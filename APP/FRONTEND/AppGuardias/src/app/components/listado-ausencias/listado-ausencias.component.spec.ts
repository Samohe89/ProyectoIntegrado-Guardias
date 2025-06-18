import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAusenciasComponent } from './listado-ausencias.component';

describe('ListadoAusenciasComponent', () => {
  let component: ListadoAusenciasComponent;
  let fixture: ComponentFixture<ListadoAusenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAusenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoAusenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
