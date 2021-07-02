import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationAndCareerDetailsComponent } from './education-and-career-details.component';

describe('EducationAndCareerDetailsComponent', () => {
  let component: EducationAndCareerDetailsComponent;
  let fixture: ComponentFixture<EducationAndCareerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationAndCareerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationAndCareerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
