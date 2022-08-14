import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  loggedIn = false;
  sideBarOpen = true;

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.loggedIn = true;
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
