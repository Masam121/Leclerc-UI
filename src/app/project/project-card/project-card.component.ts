import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() thumbnail: number;
  @Input() projectName: string;
  @Input() projectManagerPicture: string;
  @Input() expectedFinishDate: string;
  @Input() completionPercentage: number;
  @Input() projectStatus: string;
  projectSAPId:  string;

  constructor() { }

  ngOnInit() {
    this.projectSAPId = this.thumbnail.toString();
  }

}
