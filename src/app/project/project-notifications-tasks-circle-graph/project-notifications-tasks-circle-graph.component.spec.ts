import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationsTasksCircleGraphComponent } from './project-notifications-tasks-circle-graph.component';

describe('ProjectNotificationsTasksCircleGraphComponent', () => {
  let component: ProjectNotificationsTasksCircleGraphComponent;
  let fixture: ComponentFixture<ProjectNotificationsTasksCircleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationsTasksCircleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationsTasksCircleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
