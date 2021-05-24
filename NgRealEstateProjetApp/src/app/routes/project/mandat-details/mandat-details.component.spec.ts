import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatDetailsComponent } from './mandat-details.component';

describe('MandatDetailsComponent', () => {
  let component: MandatDetailsComponent;
  let fixture: ComponentFixture<MandatDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
