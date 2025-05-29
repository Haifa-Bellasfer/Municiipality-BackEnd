import { Responsable } from 'src/app/entity/responsable';
import { ResponsableService } from './../../services/responsable.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss'],
})
export class ResponsableComponent implements OnInit {
  public dataSource = new MatTableDataSource<Responsable>();
  displayedColumns: string[] = ['_id'];

  constructor(public responsableService: ResponsableService) {}

  ngOnInit(): void {
    this.getResponable();
  }

  getResponable() {
    this.responsableService.getResponable().subscribe((res) => {
      console.log('Responsables', res);
      this.dataSource.data = res;
    });
  }
}
