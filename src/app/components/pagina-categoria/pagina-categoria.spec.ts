import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCategoria } from './pagina-categoria';

describe('PaginaCategoria', () => {
  let component: PaginaCategoria;
  let fixture: ComponentFixture<PaginaCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
