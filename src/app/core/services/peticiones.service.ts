import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  constructor(private http: HttpClient) {}

  createDefaultOptions(): Options {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  optsName(name: string): Options {
    const newopts = this.createDefaultOptions();
    newopts.headers['xhr-name'] = name;
    return newopts;
  }

  optsNameCache(name: string): Options {
    const newopts = this.optsName(name);
    newopts.headers['xhr-plugin'] = 'pcache';
    return newopts;
  }

  optsWithParams(params): Options {
    const newopts = this.createDefaultOptions();
    newopts.params = params;
    return newopts;
  }

  createOptions(opts: Options): Options {
    const defaultOpts: Options = this.createDefaultOptions();
    if (opts) {
      opts = {
        params: opts.params || defaultOpts.params,
        headers: opts.headers || defaultOpts.headers
      };
      if (!opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = defaultOpts.headers['Content-Type'];
      }
    }
    return opts || defaultOpts;
  }

  get<T>(serviceUrl: string, opts?: Options): Observable<T> {
    const ropts = this.createOptions(opts);
    return this.http
      .get(serviceUrl, ropts)
      .pipe(map(response => response as T));
  }

  post<T, R>(serviceUrl: string, body: T, opts?: Options): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http
      .post(serviceUrl, body, ropts)
      .pipe(map(response => response as R));
  }

  put<T, R>(serviceUrl: string, body: T, opts?: Options): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http
      .put(serviceUrl, body, ropts)
      .pipe(map(response => response as R));
  }

  delete<T, R>(serviceUrl: string, opts?: Options): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http
      .delete(serviceUrl, ropts)
      .pipe(map(response => response as R));
  }
}
