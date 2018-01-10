import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationTasksStackedBarChartComponent } from './project-notification-tasks-stacked-bar-chart.component';

describe('ProjectNotificationTasksStackedBarChartComponent', () => {
  let component: ProjectNotificationTasksStackedBarChartComponent;
  let fixture: ComponentFixture<ProjectNotificationTasksStackedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationTasksStackedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationTasksStackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
