import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Http} from "@angular/http";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Params} from "@angular/router";

import {Category} from "../../shared/category";
import {Serie} from "../../shared/serie";

import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-notification-stacked-bar-chart',
  templateUrl: './notification-stacked-bar-chart.component.html',
  styleUrls: ['./notification-stacked-bar-chart.component.css']
})
export class NotificationStackedBarChartComponent implements OnInit {
  @Output() public filter: EventEmitter<string[]> = new EventEmitter<string[]>();

  public notificationId : string;
  public graphTitle: string;
  public yAxisTitle: string;
  public categories: Category[];
  public serie: Serie[];
  public options: Object;

  constructor(
    private http:Http,
    private translate:TranslateService,
    private taskService:TaskService,
    public route: ActivatedRoute,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  ngOnInit() {
    this.getDistribution();
    this.setTranslation(this.translate.currentLang);
    this.route.params.subscribe(params => this.notificationId = params['id']);
  }

  private getDistribution() {
    this.route.params.switchMap((params: Params) => this.taskService.getNotificationTasksDistribution(params['id'])).subscribe(
      data => {
        this.setSerie(data.series);
        this.setCategory(data.categories);
        this.instanciateGraph();
      });
  }

  private setSerie(series : Serie[]){
    this.serie = series;
  }

  private setCategory(categories : Category[]){
    this.categories = categories;
  }

  private setTranslation(lang: string) : void{
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(res => {
      this.graphTitle = res.json().NotificationStackBarGraph.title + "(" + this.notificationId + ")";
      this.yAxisTitle = res.json().NotificationStackBarGraph.YaxisLabel;
      for (var i = 0; i<this.serie.length; i++){
        this.serie[i].name = res.json().ProjectStackBarGraph.categories[i];
      };
    });
  }

  private instanciateGraph() {
    this.options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: this.graphTitle,
        style: {
          color: 'white'
        }
      },
      xAxis: {
        categories: this.categories,
        labels: {
          formatter: function(){
            return '<a href="'+ 'http://localhost:4200/employees/' + this.value.id + '">' + this.value.name + '</a>';
            //return '<a [routerLink]="['+ '/employees' +', '+ this.value.id +']">' + this.value.name + '</a>';
          },
          useHTML: true
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: this.yAxisTitle
        }
      },
      legend: {
        reversed: true
      },
      tooltip: {
        formatter: function(){
          return this.y + '<b> - </b>' + this.series.name;
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          cursor: 'pointer',
          point: {
            events: {
              click: function(e){
                const p = e.point
                this.filter.emit([p.category, p.series.name]);
              }.bind(this)
            }
          }
        }
      },
      series: this.serie,
      colors: ["#b1000e", "#ffbc42", "#067aff", "#548036"],
    }
  }
}
