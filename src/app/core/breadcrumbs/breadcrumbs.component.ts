import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public readonly nombreApp = 'Hospital';
  titulo = '';
  constructor(private router: Router, private titleService: Title, private meta: Meta) {
    this.getDataRoute()
    .subscribe( data => {
      window.console.log(data);
      this.titulo = data.title;
      this.titleService.setTitle(`${this.nombreApp} > ${this.titulo}` );
      this.updateMetaTag();
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data)
    );
  }

  updateMetaTag() {
    const metaTag: MetaDefinition = {
      name: 'description',
      content: this.titulo
    };
    this.meta.updateTag(metaTag);
  }

}
