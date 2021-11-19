import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesHeaderComponent } from './files-header.component';

describe('FilesHeaderComponent', () => {
  let component: FilesHeaderComponent;
  let fixture: ComponentFixture<FilesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
