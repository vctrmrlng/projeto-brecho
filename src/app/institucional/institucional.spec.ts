import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Institucional } from './institucional';

describe('Institucional', () => {
  let component: Institucional;
  let fixture: ComponentFixture<Institucional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Institucional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Institucional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
