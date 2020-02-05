import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncrementadorComponent, GraficaDonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ],
  exports: [
    FormsModule,
    IncrementadorComponent,
    GraficaDonaComponent
  ]
})
export class SharedModule { }
