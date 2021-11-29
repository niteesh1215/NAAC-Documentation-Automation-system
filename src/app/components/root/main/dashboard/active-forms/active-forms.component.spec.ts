import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFormsComponent } from './active-forms.component';

describe('ActiveFormsComponent', () => {
  let component: ActiveFormsComponent;
  let fixture: ComponentFixture<ActiveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
