import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuntvprofileComponent } from './suntvprofile.component';

describe('SuntvprofileComponent', () => {
  let component: SuntvprofileComponent;
  let fixture: ComponentFixture<SuntvprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuntvprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuntvprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
