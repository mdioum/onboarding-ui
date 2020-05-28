import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPostedComponent } from './request-posted.component';

describe('RequestPostedComponent', () => {
  let component: RequestPostedComponent;
  let fixture: ComponentFixture<RequestPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
