import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressInterestComponent } from './express-interest.component';

describe('ExpressInterestComponent', () => {
  let component: ExpressInterestComponent;
  let fixture: ComponentFixture<ExpressInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
