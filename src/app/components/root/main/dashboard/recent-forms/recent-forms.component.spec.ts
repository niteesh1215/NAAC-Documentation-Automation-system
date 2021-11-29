import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentFormsComponent } from './recent-forms.component';

describe('RecentFormsComponent', () => {
  let component: RecentFormsComponent;
  let fixture: ComponentFixture<RecentFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
