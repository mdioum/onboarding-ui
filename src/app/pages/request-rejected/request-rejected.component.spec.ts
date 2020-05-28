import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRejectedComponent } from './request-rejected.component';

describe('RequestRejectedComponent', () => {
  let component: RequestRejectedComponent;
  let fixture: ComponentFixture<RequestRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
