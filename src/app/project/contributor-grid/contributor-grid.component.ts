import {Component, Input, OnInit} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Contributor } from '../../shared/contributor';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-contributor-grid',
  templateUrl: './contributor-grid.component.html',
  styleUrls: ['./contributor-grid.component.css']
})
export class ContributorGridComponent implements OnInit {
  contributors : Contributor[];
  colsNumber: number = 5;
  @Input() public name : string;

  constructor(
              public projectService : ProjectService,
              public route: ActivatedRoute
  ) {}

  onResize(event) {
    const element = event.target.innerWidth;
    console.log(element);
    if (element < 950) { this.colsNumber = 6; }
    else if (element < 950) { this.colsNumber = 6; }
    else if (element < 950) { this.colsNumber = 5; }
    else if (element < 950) { this.colsNumber = 4; }
    else if (element < 950) { this.colsNumber = 4; }
    else if (element < 950) { this.colsNumber = 4; }
    else if (element < 950) { this.colsNumber = 3; }
    else if (element < 950) { this.colsNumber = 2; }
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.projectService.getProjectContributor(+params['id'])).subscribe(
      contributors => {
        this.contributors = contributors;
      });
  }
}
