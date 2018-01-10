import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from "../../shared/category";
import {Serie} from "../../shared/serie";
import {Http} from "@angular/http";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-project-notification-tasks-stacked-bar-chart',
  templateUrl: './project-notification-tasks-stacked-bar-chart.component.html',
  styleUrls: ['./project-notification-tasks-stacked-bar-chart.component.css']
})
export class ProjectNotificationTasksStackedBarChartComponent implements OnInit {
  @Output() public filter: EventEmitter<string[]> = new EventEmitter<string[]>();

  public notificationId : string;
  public graphTitle: string;
  public yAxisTitle: string;
  public categories: Category[];
  public serie: Serie[];
  public options: Object;

  constructor(
    private router: Router,
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
    this.route.params.switchMap((params: Params) => this.taskService.getProjectNotificationsTasksDistribution(params['id'])).subscribe(
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

  private goTo(id: string){
    let link = ['/employees', id];
    this.router.navigate(link);
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
        type: 'category',
        categories: this.categories,
        min: 0,
        tickLength: 0,
        labels: {
          formatter: function(){
            return '<a href="'+ 'http://projet.dev.gbl//employee/' + this.value.id + '">' + this.value.name + '</a>';
            //return '<a [routerLink]="['+ '/employees' +', '+ this.value.id +']">' + this.value.name + '</a>';
          },
          useHTML: true
        }
      },
      yAxis: {
        scrollbar: {
          enabled: true
        },
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
