import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorradoComponent } from './modal-borrado.component';

describe('ModalBorradoComponent', () => {
  let component: ModalBorradoComponent;
  let fixture: ComponentFixture<ModalBorradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBorradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
