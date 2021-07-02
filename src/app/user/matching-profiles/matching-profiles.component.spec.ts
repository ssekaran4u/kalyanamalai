import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingProfilesComponent } from './matching-profiles.component';

describe('MatchingProfilesComponent', () => {
  let component: MatchingProfilesComponent;
  let fixture: ComponentFixture<MatchingProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
