import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {EmployeeDataTableRow} from "../../shared/employeeDataTableRow";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Facility} from "../../shared/facility";
import {Http} from "@angular/http";

@Component({
  selector: 'app-employee-workload-data-table',
  templateUrl: './employee-workload-data-table.component.html',
  styleUrls: ['./employee-workload-data-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeWorkloadDataTableComponent implements OnInit {
  @ViewChild('myTable') table: any;

  public rows: EmployeeDataTableRow[];
  private temp: EmployeeDataTableRow[];

  private placeholder: string;
  private teamPerPage: string;
  private filtred : boolean;
  private myFilter : string;

  private selected = [];
  private limit : number = 100;
  private expension: boolean = true;
  limitOptions = [
    {
      key: '1',
      value: 1
    },
    {
      key: '5',
      value: 5
    },
    {
      key: '10',
      value: 10
    },
    {
      key: '',
      value: 100
    }
  ];

  private month0: string;
  private month1: string;
  private month2: string;
  private month3: string;
  private month4: string;
  private month5: string;
  private month6: string;
  private month7: string;
  private month8: string;
  private month9: string;
  private month10: string;
  private month11: string;

  constructor(private notificationService: NotificationService,
              private router: Router,
              public translate: TranslateService,
              private http:Http) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  public setTranslation(lang : string) : void{
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(res => {
      this.limitOptions[3].key = res.json().Employee.limitOptionsName;
      this.teamPerPage = res.json().Employee.teamPerPage;
      this.placeholder = res.json().Employee.search;
    });
  }

  /*getGroupRowHeight(group, rowHeight) {
    let style = {};

    style = {
      height: (group.length * 40) + 'px',
      width: '100%'
    };

    return style;
  }*/

  /*closeOrOpen(){
    if(this.expension == true){
      console.log("worked");
      this.table.groupHeader.collapseAllGroups();
      this.expension = false;
    }
    else{
      //Not working...
      this.table.groupHeader.expandAllGroups();
      this.expension = true;
    }
  }*/

  /*toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }*/

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onSelect({ selected }) {
    this.selected = selected[0].sapId;
    this.gotoDetail();
  }

  gotoDetail(): void{
    this.router.navigate(['/employee', this.selected]);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.temp.filter(function(d){
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //Set filter
    if (val == ''){
      this.filtred = false;
    }
    else{
      this.filtred = true;
    }
    this.table.offset = 0;
  }

  getCellClass({ row, column, value }): any {
    let lateStyle = {
      'is-late': true
    };

    let averageStyle = {
      'is-average': true
    }

    if(value > 100){
      return lateStyle;
    }
    if(value > 90){
      return averageStyle;
    }
  }

  getColumnClass(row): any {
    let style = {};

    style = {
      'currentTime': true
    };

    return style;
  }



  ngOnInit() {
    this.notificationService.getEmployeesNotificationsWorkload().subscribe(
      data => {
        this.rows = data.rows;
        this.temp = [...this.rows];
        this.month0 = data.timeLine[0];
        this.month1 = data.timeLine[1];
        this.month2 = data.timeLine[2];
        this.month3 = data.timeLine[3];
        this.month4 = data.timeLine[4];
        this.month5 = data.timeLine[5];
        this.month6 = data.timeLine[6];
        this.month7 = data.timeLine[7];
        this.month8 = data.timeLine[8];
        this.month9 = data.timeLine[9];
        this.month10 = data.timeLine[10];
        this.month11 = data.timeLine[11];
      });
    this.setTranslation(this.translate.currentLang);
  }

}
