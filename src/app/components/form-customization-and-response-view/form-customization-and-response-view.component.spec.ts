import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomizationAndResponseViewComponent } from './form-customization-and-response-view.component';

describe('FormCustomizationAndResponseViewComponent', () => {
  let component: FormCustomizationAndResponseViewComponent;
  let fixture: ComponentFixture<FormCustomizationAndResponseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCustomizationAndResponseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCustomizationAndResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
