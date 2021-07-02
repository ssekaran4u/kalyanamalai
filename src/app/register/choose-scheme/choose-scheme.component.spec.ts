import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSchemeComponent } from './choose-scheme.component';

describe('ChooseSchemeComponent', () => {
  let component: ChooseSchemeComponent;
  let fixture: ComponentFixture<ChooseSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
