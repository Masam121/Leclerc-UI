import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationDataTableComponent } from './project-notification-data-table.component';

describe('ProjectNotificationDataTableComponent', () => {
  let component: ProjectNotificationDataTableComponent;
  let fixture: ComponentFixture<ProjectNotificationDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
