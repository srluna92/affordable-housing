import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';
import { environment } from '../../environments/environment';
import { NguiMapModule } from '@ngui/map';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({apiUrl: environment.mapApiKey + '&libraries=visualization'}),
    MaterialModule
  ],
  declarations: [GoogleMapComponent],
  exports: [GoogleMapComponent]
})
export class GoogleMapModule { }
