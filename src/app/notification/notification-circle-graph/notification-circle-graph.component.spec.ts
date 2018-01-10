import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCircleGraphComponent } from './notification-circle-graph.component';

describe('NotificationCircleGraphComponent', () => {
  let component: NotificationCircleGraphComponent;
  let fixture: ComponentFixture<NotificationCircleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCircleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCircleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
