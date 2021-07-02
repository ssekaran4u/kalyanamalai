import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentvisitorsComponent } from './recentvisitors.component';

describe('RecentvisitorsComponent', () => {
  let component: RecentvisitorsComponent;
  let fixture: ComponentFixture<RecentvisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentvisitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentvisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
