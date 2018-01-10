import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationStackedBarChartComponent } from './notification-stacked-bar-chart.component';

describe('NotificationStackedBarChartComponent', () => {
  let component: NotificationStackedBarChartComponent;
  let fixture: ComponentFixture<NotificationStackedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationStackedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationStackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
