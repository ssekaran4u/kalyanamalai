import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmservicesComponent } from './kmservices.component';

describe('KmservicesComponent', () => {
  let component: KmservicesComponent;
  let fixture: ComponentFixture<KmservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
