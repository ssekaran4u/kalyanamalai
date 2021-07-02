import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommunicationAddressComponent } from './edit-communication-address.component';

describe('EditCommunicationAddressComponent', () => {
  let component: EditCommunicationAddressComponent;
  let fixture: ComponentFixture<EditCommunicationAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommunicationAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommunicationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
