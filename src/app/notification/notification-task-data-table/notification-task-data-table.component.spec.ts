import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTaskDataTableComponent } from './notification-task-data-table.component';

describe('NotificationTaskDataTableComponent', () => {
  let component: NotificationTaskDataTableComponent;
  let fixture: ComponentFixture<NotificationTaskDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTaskDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTaskDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
