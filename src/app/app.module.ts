import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.module';
import { GoogleMapModule } from './google-map/google-map.module';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { MainService, MapService } from './services/service.index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MaterialModule,
    GoogleMapModule
  ],
  providers: [MainService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
