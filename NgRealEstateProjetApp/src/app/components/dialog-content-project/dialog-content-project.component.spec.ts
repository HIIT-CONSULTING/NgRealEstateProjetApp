import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentProjectComponent } from './dialog-content-project.component';

describe('DialogContentProjectComponent', () => {
  let component: DialogContentProjectComponent;
  let fixture: ComponentFixture<DialogContentProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
