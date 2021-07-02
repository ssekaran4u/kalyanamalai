import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHobbiesDetailsComponent } from './edit-hobbies-details.component';

describe('EditHobbiesDetailsComponent', () => {
  let component: EditHobbiesDetailsComponent;
  let fixture: ComponentFixture<EditHobbiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHobbiesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHobbiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
