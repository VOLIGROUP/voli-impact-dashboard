
/// <reference types="vite/client" />

// Google Maps Types
declare namespace google.maps {
  interface MapsLibrary {
    Map: typeof google.maps.Map;
    LatLngBounds: typeof google.maps.LatLngBounds;
  }
  
  interface MarkerLibrary {
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
    PinElement: typeof google.maps.marker.PinElement;
  }
}

declare global {
  interface Window {
    google: {
      maps: {
        importLibrary: (name: string) => Promise<any>;
      };
    };
  }
}
