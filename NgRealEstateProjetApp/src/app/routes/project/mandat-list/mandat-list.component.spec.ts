import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatListComponent } from './mandat-list.component';

describe('MandatListComponent', () => {
  let component: MandatListComponent;
  let fixture: ComponentFixture<MandatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
