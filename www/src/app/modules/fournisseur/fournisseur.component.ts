import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/entity/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {
  // columns we will show on the table
  public displayedColumns = ['_id', 'name', 'email', 'action'];

  //the source where we will get the data
  public dataSource = new MatTableDataSource<User>();

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs() {
    this.userService.getFournisseurs().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }
}
