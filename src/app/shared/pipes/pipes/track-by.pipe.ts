import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
interface TrackBy {
  [propiedad: string]: <T>(indice: number, elemento: T) => any;
}
const cache: TrackBy = Object.create(null);

@Pipe({
  name: 'trackBy',
  pure: true
})
export class TrackByPipe implements PipeTransform {
  public transform(propiedad: string) {
    if (!cache[propiedad]) {
      cache[propiedad] = function trackBy<T>(indice: number, elemento: T): any {
        return elemento[propiedad];
      };
    }
    return cache[propiedad];
  }
}
