import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyExpectationComponent } from './edit-my-expectation.component';

describe('EditMyExpectationComponent', () => {
  let component: EditMyExpectationComponent;
  let fixture: ComponentFixture<EditMyExpectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyExpectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyExpectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
