import { ResponsableService } from '../../../services/responsable.service';
import { Responsable } from '../../../entity/responsable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  responsable: any;
  responsables: any;

  constructor(private router: Router, public userService: ResponsableService) {}

  ngOnInit(): void {
    this.getResponsable();
  }

  getResponsable() {
    this.userService.getResponable().subscribe((res) => {
      console.log('respon', res);
      this.responsable = res;
      this.responsables = this.responsable[0].username;
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
