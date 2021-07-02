import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLifeStyleInformationComponent } from './edit-life-style-information.component';

describe('EditLifeStyleInformationComponent', () => {
  let component: EditLifeStyleInformationComponent;
  let fixture: ComponentFixture<EditLifeStyleInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLifeStyleInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLifeStyleInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
