import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingplannersComponent } from './weddingplanners.component';

describe('WeddingplannersComponent', () => {
  let component: WeddingplannersComponent;
  let fixture: ComponentFixture<WeddingplannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingplannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingplannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
