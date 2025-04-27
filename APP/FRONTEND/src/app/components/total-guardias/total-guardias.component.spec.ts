import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGuardiasComponent } from './total-guardias.component';

describe('TotalGuardiasComponent', () => {
  let component: TotalGuardiasComponent;
  let fixture: ComponentFixture<TotalGuardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalGuardiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
