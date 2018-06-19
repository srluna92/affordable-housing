// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapApiKey: 'https://maps.google.com/maps/api/js?key=AIzaSyCFYczikiy8amTcAnOntLGal_EHEwOKNLg',
  defaultMap: {
    center: {lat: 41.2565, lng: -95.9345},
    zoom: 12,
    mapTypeId: 'roadmap'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
