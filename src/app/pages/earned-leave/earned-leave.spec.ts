import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedLeave } from './earned-leave';

describe('EarnedLeave', () => {
  let component: EarnedLeave;
  let fixture: ComponentFixture<EarnedLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnedLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarnedLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
