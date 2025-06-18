import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNoEditadoComponent } from './modal-no-editado.component';

describe('ModalNoEditadoComponent', () => {
  let component: ModalNoEditadoComponent;
  let fixture: ComponentFixture<ModalNoEditadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNoEditadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNoEditadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
