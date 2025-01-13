import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private router: Router) {}

  onCitoyenClick(): void {
    localStorage.setItem('role', 'Citoyen');
    this.router.navigate(['/login']);
  }

  onFournisseurClick(): void {
    localStorage.setItem('role', 'Fournisseur');
    this.router.navigate(['/login']);
  }
}
