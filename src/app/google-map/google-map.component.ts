import { Component, OnInit, ViewChild } from '@angular/core';
import { HeatmapLayer, DataLayer } from '@ngui/map';
import { MapService, MainService } from '../services/service.index';
import { environment } from '../../environments/environment';

// References
// https://developers.google.com/maps/documentation/javascript/
// https://github.com/ng2-ui/map/tree/master/app/map-components
// https://www.census.gov/data/developers/data-sets.html

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(HeatmapLayer) heatmapLayer: HeatmapLayer;
  @ViewChild(DataLayer) datamapLayer: DataLayer;
  // use @ViewChildren for multiple datalayers
  heatmap: google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  points: google.maps.LatLng[];
  positions: google.maps.GeocoderResult[];
  paths = new Array<any>();
  errorCode: string;
  mapOptions = environment.defaultMap;

  constructor(
    private mapService: MapService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.heatmapLayer['initialized$'].subscribe(heatmap => {
      this.mapService.addPoint(41.282551, -95.445368);
      this.mapService.addPoint(41.382551, -95.544586);
      this.mapService.addPoint(41.482551, -95.643688);
      this.mapService.heatMapPoints.next(this.points);
      this.heatmap = heatmap;
      this.map = this.heatmap.getMap();
    });

    this.datamapLayer['initialized$'].subscribe(() => {
      this.map.data.loadGeoJson('../../assets/map.json', null);
      this.map.data.setStyle({
        visible: false
      });
    });

    this.mapService.heatMapPoints.asObservable().subscribe(p => this.points = p);
    this.mapService.markers.asObservable().subscribe(m => this.positions = m);
    this.mainService.error.asObservable().subscribe(e => this.errorCode = e);
  }

  toggleHeatmap() {
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }

  changeGradient() {
    const gradient = [
      'rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)', 'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)'
    ];
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
  }

  changeRadius() {
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
  }

  changeOpacity() {
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
  }

  loadRandomPoints() {
    this.points = [];
    this.mapService.heatMapPoints.next([]);
    for (let i = 0 ; i < 9; i++) {
      this.addPoint();
    }
    this.mapService.heatMapPoints.next(this.points);
  }

  addPoint() {
    this.mapService.addPoint();
    this.heatmap.setData(this.points);
  }

  removeMarker(i: number) {
    this.positions.splice(i, 1);
    this.mapService.markers.next(this.positions);
  }

  mapClick(event) {
    if (event instanceof MouseEvent) {
      return;
    }
    this.mapService.geocode({'location': event.latLng});
  }

  addBounds(): void {
    if (!this.positions || this.positions.length < 1) {
      window.alert(this.mainService.setError('INVALID_REQUEST'));
      return;
    }
    this.mapService.getBounds({'address': this.positions[this.positions.length - 1].formatted_address}).subscribe(bounds => {
      if (!!bounds) {
        this.paths.push([
          {lat: bounds.south, lng: bounds.west},
          {lat: bounds.south, lng: bounds.east},
          {lat: bounds.north, lng: bounds.east},
          {lat: bounds.north, lng: bounds.west}
        ]);
      }
    });
  }

  toggleDataLayer(): void {
    const style = this.map.data.getStyle();
    this.map.data.setStyle({
      visible: !!style && !style['visible']
    });
  }

  polygonClick(e: Event): void {
    console.log(e);
  }
}
