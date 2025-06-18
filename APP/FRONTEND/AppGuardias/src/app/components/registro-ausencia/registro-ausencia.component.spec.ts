import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAusenciaComponent } from './registro-ausencia.component';

<<<<<<< HEAD
describe('RegistroAusenciaDirectivoComponent', () => {
=======
describe('RegistroAusenciaComponent', () => {
>>>>>>> 1887f0748e75de3a9562efa492a21fbe0386dc13
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
