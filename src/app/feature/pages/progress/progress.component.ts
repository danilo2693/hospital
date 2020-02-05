import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progresoAzul = 10;
  progresoRojo = 30;
  progresoMinimo = 0;
  progresoMaximo = 100;
  paso = 5;
  constructor() {}

  ngOnInit() {}

}
