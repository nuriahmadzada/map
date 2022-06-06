import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDuZa8SmS1i01Jm0ScPX1D19b-ekPCoZdw',
      libraries: ['places']
    }),
    AgmDirectionModule,
    GooglePlaceModule,
    SharedModule
  ],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class GmapModule { }
