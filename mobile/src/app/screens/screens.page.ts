import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screens',
  templateUrl: 'screens.page.html',
  styleUrls: ['screens.page.scss'],
  standalone: false,
})
export class ScreensPage implements OnInit {
  role: string = '';
  constructor() {}
  ngOnInit(): void {
    this.role = localStorage.getItem('role') as string;
  }
}
