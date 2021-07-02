import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingFixedComponent } from './wedding-fixed.component';

describe('WeddingFixedComponent', () => {
  let component: WeddingFixedComponent;
  let fixture: ComponentFixture<WeddingFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
