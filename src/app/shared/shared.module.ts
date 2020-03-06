import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [IncrementadorComponent, GraficaDonaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ChartsModule, PipesModule],
  exports: [
    FormsModule,
    IncrementadorComponent,
    GraficaDonaComponent,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SharedModule {}
