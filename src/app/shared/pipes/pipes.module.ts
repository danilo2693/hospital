import { NgModule } from '@angular/core';
import { ImagenPipe } from './pipes/imagen.pipe';
import { TrackByPipe } from './pipes/track-by.pipe';

@NgModule({
  declarations: [ImagenPipe, TrackByPipe],
  imports: [],
  exports: [ImagenPipe, TrackByPipe]
})
export class PipesModule {}
