import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificcationDetailComponent } from './project-notification-detail.component';

describe('ProjectNotificcationDetailComponent', () => {
  let component: ProjectNotificcationDetailComponent;
  let fixture: ComponentFixture<ProjectNotificcationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificcationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificcationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
