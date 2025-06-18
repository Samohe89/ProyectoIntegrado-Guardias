import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoDatosComponent } from './modal-no-datos.component';

describe('ModalNoDatosComponent', () => {
  let component: ModalNoDatosComponent;
  let fixture: ComponentFixture<ModalNoDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNoDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNoDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
