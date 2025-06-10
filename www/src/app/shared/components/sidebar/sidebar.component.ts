import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsableService } from '../../../services/responsable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  responsable: any;
  responsables: any;
  isSuperAdmin: boolean = false;

  constructor(private router: Router, public userService: ResponsableService) {
    const userId = localStorage.getItem('userId');
    this.isSuperAdmin = userId === environment.SUPERADMINID;
  }

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
