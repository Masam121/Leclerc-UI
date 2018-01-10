import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDataTableComponent } from './notification-data-table.component';

describe('NotificationDataTableComponent', () => {
  let component: NotificationDataTableComponent;
  let fixture: ComponentFixture<NotificationDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
