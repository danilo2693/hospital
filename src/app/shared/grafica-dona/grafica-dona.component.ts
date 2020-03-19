import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {
  @Input() datos: any[] = [];
  @Input() etiquetas: string[] = [];
  public tipoGrafico: ChartType = 'doughnut';

  constructor() {}

  ngOnInit() {}

  public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {}

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {}
}
