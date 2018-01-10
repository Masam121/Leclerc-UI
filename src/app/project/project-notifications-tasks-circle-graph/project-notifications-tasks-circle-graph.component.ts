import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EffortStatus} from "../../shared/effortStatus";
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-project-notifications-tasks-circle-graph',
  templateUrl: './project-notifications-tasks-circle-graph.component.html',
  styleUrls: ['./project-notifications-tasks-circle-graph.component.css']
})
export class ProjectNotificationsTasksCircleGraphComponent implements OnInit {
  @Output() public filter: EventEmitter<string> = new EventEmitter<string>();

  public taskEffort: EffortStatus[];
  public centerTitle: string;
  public CompletionPercentage: number;
  public options: Object;

  constructor(private taskService: TaskService, public route: ActivatedRoute) { }

  public getNotificationTaskEffort() : void{
    this.route.params.switchMap((params: Params) => this.taskService.getProjectNotificationsTasksEffortStatus(params['id'])).subscribe(
      data => {
        this.taskEffort = data;
        this.setCompletionPercentage();
        this.instantiateGraph();
      })
  }

  public setCompletionPercentage() : void{
    var totalEffort = (this.taskEffort[0].effort + this.taskEffort[1].effort + this.taskEffort[2].effort + this.taskEffort[3].effort);
    var effortCompleted = this.taskEffort[3].effort;
    this.CompletionPercentage = (effortCompleted/totalEffort)*100;
  }

  public instantiateGraph() : void{
    this.setCompletionPercentage();
    this.centerTitle = this.CompletionPercentage.toFixed(1).toString() + "%<br>" + "Task Completed";
    this.options = {
      chart: {
        backgroundColor: {
          linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
          stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
          ]
        },
        plotBorderWidth: 0,
        plotShadow: false,
        plotBorderColor: '#606063'
      },
      title: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '22px'
        },
        text: this.centerTitle,
        align: 'center',
        verticalAlign: 'middle',
        y: 0
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {}
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: '#B0B0B3'
            }
          },
          startAngle: -90,
          endAngle: 270,
          center: ['50%', '50%'],
          animation: {
            duration: 1750
          },
          point: {
            events: {
              click: function (e) {
                const p = e.point;
                this.filter.emit(p.name);
              }.bind(this)
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Task %',
        innerSize: '50%',
        data: [
          {
            y: this.taskEffort[0].effort,
            name: this.taskEffort[0].name,
          }, {
            y: this.taskEffort[1].effort,
            name: this.taskEffort[1].name,
          }, {
            y: this.taskEffort[2].effort,
            name: this.taskEffort[2].name,
          }, {
            y: this.taskEffort[3].effort,
            name: this.taskEffort[3].name,
          }
        ]
      }]
    };
  }

  ngOnInit() {
    this.getNotificationTaskEffort();
  }
}
