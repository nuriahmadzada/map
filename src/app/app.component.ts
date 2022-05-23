import { MapsAPILoader, MouseEvent, AgmMap } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title: string = 'Google Maps';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  isLoading: boolean = true;
  origin: any;
  destination: any;
  showPolylines: boolean;
  distance: any;
  time: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }

  public renderOptions = {
    suppressMarkers: true,
  }

  public markerOptions = {
    origin: {
      draggable: true,
    },
    destination: {
      draggable: true,
      opacity: 0.6,
    },
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  onChange(event: MouseEvent) {
    this.showPolylines = true;
    this.origin = { lat: this.latitude, lng: this.longitude };
    this.destination = { lat: event.coords.lat, lng: event.coords.lng };
  }

  changePolyline(event: any) {
    console.log(event, "ev");
    this.distance = event.routes[0].legs[0].distance.text;
    this.time = event.routes[0].legs[0].duration.text;
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
        this.isLoading = false;
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          this.address = results[0].formatted_address;
        } else {
          window.alert('Nəticə tapılmadı');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
