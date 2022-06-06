import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyHolderComponent } from './body-holder/body-holder.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GmapModule } from '../gmap/gmap.module'
import { AboutUsModule } from '../about-us/about-us.module'


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    GmapModule,
    AboutUsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [BodyHolderComponent],
  exports: [BodyHolderComponent]
})
export class CoreModule { }
