import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEducationAndCareerDetailsComponent } from './edit-education-and-career-details.component';

describe('EditEducationAndCareerDetailsComponent', () => {
  let component: EditEducationAndCareerDetailsComponent;
  let fixture: ComponentFixture<EditEducationAndCareerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEducationAndCareerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEducationAndCareerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
