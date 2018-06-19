import { Route } from '@angular/router';
import { GoogleMapRoute } from './google-map/google-map.routes';

export const routes: Route[] = [
  ...GoogleMapRoute,
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
