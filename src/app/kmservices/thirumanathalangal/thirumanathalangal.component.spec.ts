import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirumanathalangalComponent } from './thirumanathalangal.component';

describe('ThirumanathalangalComponent', () => {
  let component: ThirumanathalangalComponent;
  let fixture: ComponentFixture<ThirumanathalangalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirumanathalangalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirumanathalangalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
