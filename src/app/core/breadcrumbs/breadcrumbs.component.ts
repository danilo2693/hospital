import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public readonly nombreApp = 'Hospital';
  titulo = '';

  constructor(
    private router: Router,
    private titleService: Title,
    private translateService: TranslateService,
    private meta: Meta
  ) {
    this.getDataRoute().subscribe(data => {
      this.titulo = data.title;
      const tituloTraducido = this.translateService.instant(this.titulo);
      this.titleService.setTitle(`${this.nombreApp} > ${tituloTraducido}`);
      this.updateMetaTag();
    });
  }

  ngOnInit() {}

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
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
