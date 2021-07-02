import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDescribeYourselfComponent } from './edit-describe-yourself.component';

describe('EditDescribeYourselfComponent', () => {
  let component: EditDescribeYourselfComponent;
  let fixture: ComponentFixture<EditDescribeYourselfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDescribeYourselfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDescribeYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
