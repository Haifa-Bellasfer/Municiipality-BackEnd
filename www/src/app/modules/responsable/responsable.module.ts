import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsableComponent } from './responsable.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ResponsableComponent],
  imports: [CommonModule, MatTableModule],
})
export class ResponsableModule {}
