import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalHorasComponent } from './horas-guardia.component';

describe('TotalHorasComponent', () => {
  let component: TotalHorasComponent;
  let fixture: ComponentFixture<TotalHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalHorasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
