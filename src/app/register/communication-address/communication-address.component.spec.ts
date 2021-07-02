import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationAddressComponent } from './communication-address.component';

describe('CommunicationAddressComponent', () => {
  let component: CommunicationAddressComponent;
  let fixture: ComponentFixture<CommunicationAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
