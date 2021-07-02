import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeExclusiveComponent } from './scheme-exclusive.component';

describe('SchemeExclusiveComponent', () => {
  let component: SchemeExclusiveComponent;
  let fixture: ComponentFixture<SchemeExclusiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeExclusiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeExclusiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
