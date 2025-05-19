import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGuardiasComponent } from './listado-guardias.component';

describe('ListadoGuardiasComponent', () => {
  let component: ListadoGuardiasComponent;
  let fixture: ComponentFixture<ListadoGuardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGuardiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
