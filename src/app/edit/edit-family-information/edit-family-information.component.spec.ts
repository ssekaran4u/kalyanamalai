import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamilyInformationComponent } from './edit-family-information.component';

describe('EditFamilyInformationComponent', () => {
  let component: EditFamilyInformationComponent;
  let fixture: ComponentFixture<EditFamilyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFamilyInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFamilyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
