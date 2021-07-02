import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUploadProfileComponent } from './edit-upload-profile.component';

describe('EditUploadProfileComponent', () => {
  let component: EditUploadProfileComponent;
  let fixture: ComponentFixture<EditUploadProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUploadProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUploadProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
