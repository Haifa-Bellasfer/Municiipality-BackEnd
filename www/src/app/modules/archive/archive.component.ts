import { ArchiveService } from './../../services/archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { Archive } from './../../entity/archive';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  archive: Archive[] = [];
  // columns we will show on the table
  public displayedColumns = [
    '_id',
    'description',
    'reclamation',
    'fournisseur',
    'action',
  ];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Archive>();

  constructor(public archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.getArchives();
  }

  getArchives() {
    this.archiveService.getArchives().subscribe((res) => {
      this.dataSource.data = res;
      console.log('archiiivee : ', res);
    });
  }

  delete(id: string) {
    this.archiveService.deleteArchiveReclamation(id).subscribe((res) => {
      this.dataSource.data = res;
      console.log('deleted : ', res);
    });
  }
}
