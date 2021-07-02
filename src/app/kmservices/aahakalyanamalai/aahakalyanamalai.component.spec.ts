import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AahakalyanamalaiComponent } from './aahakalyanamalai.component';

describe('AahakalyanamalaiComponent', () => {
  let component: AahakalyanamalaiComponent;
  let fixture: ComponentFixture<AahakalyanamalaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AahakalyanamalaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AahakalyanamalaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
