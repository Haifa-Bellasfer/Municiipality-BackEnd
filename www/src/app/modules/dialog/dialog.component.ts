import { ArchiveService } from './../../services/archive.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  description: string = '';
  archived: any;

  constructor(public archiveService: ArchiveService, private router: Router) {}

  ngOnInit(): void {}

  getDescription(event: any) {
    this.description = event.target.value;
  }

  archiver() {
    const id = localStorage.getItem('idRecalmation');

    this.archiveService
      .addArchive(id as any, this.description)
      .subscribe((res) => {
        this.archived = res;
        console.log('deleted : ', res);
      });
    localStorage.removeItem('idReclamation');
    setTimeout(() => {
      this.router.navigateByUrl('/reclamations');
    }, 2000);
  }
}
