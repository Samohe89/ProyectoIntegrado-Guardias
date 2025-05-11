import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAusenciaDirectivoComponent } from './registro-ausencia-directivo.component';

describe('RegistroAusenciaDirectivoComponent', () => {
  let component: RegistroAusenciaDirectivoComponent;
  let fixture: ComponentFixture<RegistroAusenciaDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAusenciaDirectivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAusenciaDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
