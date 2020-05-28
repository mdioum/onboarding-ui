import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAcceptedComponent } from './request-accepted.component';

describe('RequestAcceptedComponent', () => {
  let component: RequestAcceptedComponent;
  let fixture: ComponentFixture<RequestAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
