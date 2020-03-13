import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})

export class IncrementadorComponent implements OnInit {
  @ViewChild('inputProgreso', { static: false }) inputProgreso: ElementRef;
  @Input() progreso = 10;
  @Input() leyenda = 'Leyenda';
  @Input() progresoMinimo = 0;
  @Input() progresoMaximo = 100;
  @Input() paso = 5;
  @Output() cambioElProgreso = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  cambiarProgreso(valor: number) {
    if (this.progreso >= (this.progresoMinimo + this.paso) && this.progreso <= (this.progresoMaximo - this.paso)
      || (this.progreso === this.progresoMinimo && valor === this.paso)
      || (this.progreso === this.progresoMaximo && valor === -this.paso)) {
        this.progreso += valor;
    } else {
      return;
    }
    this.cambioElProgreso.emit(this.progreso) ;
    this.inputProgreso.nativeElement.focus();
  }

  cambiarValorProgreso(nuevoValorProgreso) {
    if (nuevoValorProgreso > this.progresoMaximo) {
      this.progreso = this.progresoMaximo;
    } else if (nuevoValorProgreso < 1 || !nuevoValorProgreso) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValorProgreso;
    }
    this.inputProgreso.nativeElement.value = this.progreso;
    this.cambioElProgreso.emit(this.progreso) ;
  }

}
