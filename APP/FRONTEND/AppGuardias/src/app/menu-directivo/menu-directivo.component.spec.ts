import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDirectivoComponent } from './menu-directivo.component';

describe('MenuDirectivoComponent', () => {
  let component: MenuDirectivoComponent;
  let fixture: ComponentFixture<MenuDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDirectivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
