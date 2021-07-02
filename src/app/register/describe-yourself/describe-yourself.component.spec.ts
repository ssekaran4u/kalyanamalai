import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeYourselfComponent } from './describe-yourself.component';

describe('DescribeYourselfComponent', () => {
  let component: DescribeYourselfComponent;
  let fixture: ComponentFixture<DescribeYourselfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescribeYourselfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
