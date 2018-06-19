import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from './main.service';
import { Observable } from 'rxjs';

@Injectable()
export class MapService {

  markers = new BehaviorSubject<Array<google.maps.GeocoderResult>>(new Array<google.maps.GeocoderResult>());
  heatMapPoints = new BehaviorSubject<Array<google.maps.LatLng>>(new Array<google.maps.LatLng>());
  geoCoder: google.maps.Geocoder;

  constructor(
    private mainService: MainService
  ) { }

  geocode(searchObj: any): void {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode(searchObj, (results, status) => {
      if (status.toString() === 'OK') {
        const m = this.markers.getValue();
        m.push(results[0]);
        this.markers.next(m);
      } else {
        this.mainService.setError(status);
      }
    });
  }

  getBounds(searchObj: any): Observable<any> {
    this.geoCoder = new google.maps.Geocoder();
    return new Observable<any> (obs => {
      this.geoCoder.geocode(searchObj, (results, status) => {
        if (status.toString() === 'OK') {
          return obs.next(results[0].geometry.viewport.toJSON());
        } else {
          this.mainService.setError(status);
          return obs;
        }
      });
    });
  }

  addPoint(lat?: number, lng?: number): void {
    const randomLat = lat ? lat : Math.random() * 0.0099 + 41.182551;
    const randomLng = lng ? lng : Math.random() * 0.0099 + -95.945368;
    const p: any = this.heatMapPoints.getValue();
    p.push(new google.maps.LatLng(randomLat, randomLng));
    this.heatMapPoints.next(p);
  }
}
