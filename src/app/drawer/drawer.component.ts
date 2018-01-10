import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDrawer(event) : void {
    document.getElementById('drawer').style.left = "0";
  }
  closeDrawer(event) : void {
    var myDrawer = document.getElementById("drawer")
    myDrawer.style.left = "-250px";
  }
}
