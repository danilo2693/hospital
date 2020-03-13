import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-buscar-coleccion',
  templateUrl: './buscar-coleccion.component.html',
  styles: []
})
export class BuscarColeccionComponent implements OnInit {
  @Output() eventoBuscar = new EventEmitter<string>();
  @Output() eventoLimpiar = new EventEmitter<void>();
  @Input() defaultPlaceholder = '';

  constructor() { }

  ngOnInit() {
  }

  buscar(palabra: string) {
    this.eventoBuscar.emit(palabra);
  }

  limpiar(input) {
    input.value = '';
    this.eventoLimpiar.emit();
  }
}
