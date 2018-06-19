import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  markers: google.maps.GeocoderResult[];
  heatMapPoints: google.maps.LatLng[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.mapService.heatMapPoints.asObservable().subscribe(hmp => this.heatMapPoints = hmp);
    this.mapService.markers.asObservable().subscribe(m => this.markers = m);
  }
}
