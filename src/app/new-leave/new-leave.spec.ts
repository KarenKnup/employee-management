import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeave } from './new-leave';

describe('NewLeave', () => {
  let component: NewLeave;
  let fixture: ComponentFixture<NewLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
