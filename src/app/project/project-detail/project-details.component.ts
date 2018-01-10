/**
 * Created by marcelsm on 2017-05-31.
 */
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';

import { ProjectNetflix } from '../../shared/projectNetflix';
import { ProjectService } from '../../services/project.service';
import {Notification} from "../../shared/notification";

@Component({
  selector: 'my-projectDetails',
  templateUrl: './project-details.component.html',
  styleUrls: [ './/project-details.component.css'],
})

export class ProjectDetail implements OnInit {
  project : ProjectNetflix;
  notifications: Notification[] = [];

  initialBudget : string;
  budgetSpent : string;
  budgetLeft : string;
  expenses : string[] = [];
  tasksTabLoad: boolean = false;

  constructor(
    public projectService : ProjectService,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {}

  onSelect(val){
    if(val.index == 1){
      this.tasksTabLoad = true;
    }
    console.log(this.tasksTabLoad);
  }

  currencyFormat(money : string) : string {
    return money.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  setCurrencyFormat() : void{
    this.initialBudget = this.currencyFormat(this.project.initialBudget.toString());
    this.budgetSpent = this.currencyFormat(this.project.budgetSpent.toString());
    this.budgetLeft = this.currencyFormat(this.project.budgetLeft.toString());
    for (let expense of this.project.expenses){
      this.expenses.push(this.currencyFormat(expense.amount.toString()));
    }
  }

  print(): void {
    let popupWinindow
    let innerContents = document.getElementById('manager').innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            .inline {display: inline-flex;}
          </style>
        </head>
    <body onload="window.print();window.close()">
    <div style="display: flex;flex-direction: column;">
      <div class="inline">
          <h1> Project Name : </h1>
          <h1> ${this.project.projectName} </h1>
      </div> 
      <div class="inline">
         <div>Project Manager:</div>
         <div>${this.project.managerName}</div>
      </div>
      <div class="inline">
          <div> Extent : </div>
          <div> ${this.project.priority} </div>
      </div>  
      <div class="inline">
          <div> Release Date : </div>
          <div> ${this.project.startDate} </div>
      </div>  
      <div class="inline">
          <div> Expected finish date : </div>
          <div> ${this.project.estEndDate} </div>
      </div>  
      <div class="inline">
          <div> Project Completion : </div>
          <div> ${this.project.completionPercentage} </div>
      </div>  
      <div class="inline">
          <div> Department : </div>
          <div> ${this.project.department} </div>
      </div>  
      <div class="inline">
          <div> Client : </div>
          <div> ${this.project.projectsClient} </div>
      </div>  
      <div class="inline">
          <div> Facility : </div>
          <div> ${this.project.factory} </div>
      </div>  
      <div class="inline">
          <div> Description : </div>
          <div> ${this.project.description} </div>
      </div>      
    </div>
    <h2>Notifications</h2>
    <table id="example" class="display" cellspacing="0" width="100%">
      <thead>
        <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>End Date</th>
            <th>Est. Eff.</th>
            <th>Actual Eff.</th>
            <th>Completion</th>
            <th>Status</th>
        </tr>
      </thead>
      <tbody *ngFor="let item of ${this.notifications}">
        <tr>
          <th>$item.</th>
          <th>momo</th>
          <th>momo</th>
          <th>momo</th>
          <th>momo</th>
          <th>momo</th>
        </tr>
      </tbody>
    </table>
    </body>
      </html>`);
    popupWinindow.document.close();
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.projectService.getProject(+params['id'])).subscribe(
      project => {
        this.project = project;
        this.setCurrencyFormat();
      });
  }
}
