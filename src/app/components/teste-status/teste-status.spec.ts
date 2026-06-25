import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteStatus } from './teste-status';

describe('TesteStatus', () => {
  let component: TesteStatus;
  let fixture: ComponentFixture<TesteStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
