import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExpectationsComponent } from './my-expectations.component';

describe('MyExpectationsComponent', () => {
  let component: MyExpectationsComponent;
  let fixture: ComponentFixture<MyExpectationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExpectationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExpectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
