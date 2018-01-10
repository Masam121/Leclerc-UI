import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-workflow-graph',
  templateUrl: './workflow-graph.component.html',
  styleUrls: ['./workflow-graph.component.css']
})
export class WorkflowGraphComponent implements OnInit {
  @Output() public filter: EventEmitter<string> = new EventEmitter<string>();

  public options: Object;
  public category : string[];
  public actualWorkSerie : number[];
  public estimatedWorkSerie : number[];
  public workload: number[];

  constructor(private notificationService : NotificationService,
              public route: ActivatedRoute) { }

  private setCatergory(category : string[]){
    this.category = category;
  }

  private setActualWorkSerie(series : number[]){
    this.actualWorkSerie = series;
  }

  private setEstimatedWorkSerie(series : number[]){
    this.estimatedWorkSerie = series;
  }

  private setWorkload(series : number[]){
    this.workload = series;
  }

  public instantiateGraph() {
    this.options = {
      chart: {
        type: 'line'
      },
      title: {
        text: "Employee's notifications workload"
      },
      subtitle: {
        text: 'Source: SAP Notifications'
      },
      xAxis: {
        categories: this.category
      },
      yAxis: {
        title: {
          text: 'Time (Days)'
        }
      },
      tooltip: {
        formatter() {
          return '<b>'+ this.x +'</b>: '+ (this.y).toFixed(2) +'';
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            format: '{point.y:,.2f}'
          },
          enableMouseTracking: true,
          point: {
            events: {
              click: function (e) {
                const p = e.point;
                this.filter.emit(p.category);
              }.bind(this)
            }
          }

        }
      },
      series: [
        {
          name: 'Actual Workload',
          data: this.actualWorkSerie,
          color: '#FF0000'
        },
        {
          name: 'Workload',
          data: this.workload,
          color: '#098009'
        },
        {
          name: 'Estimated Workload',
          data: this.estimatedWorkSerie,
          color: '#1a6eff'
        }
        ]
    }
  }

  private getDistribution() {
    this.route.params.switchMap((params: Params) => this.notificationService.getEmployeeNotificationsWorkload(params['id'])).subscribe(
      data => {
        console.log(data);
        this.setCatergory(data.monthCategory);
        this.setActualWorkSerie(data.actualSerie);
        this.setEstimatedWorkSerie(data.estimatedSerie);
        this.setWorkload(data.monthlyWorkload);
        this.instantiateGraph();
      });
  }

  ngOnInit() {
    this.getDistribution()
  }
}
