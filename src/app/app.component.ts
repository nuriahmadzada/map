import { MapsAPILoader, MouseEvent, AgmMap } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;
import { Location, Appearance, GermanAddress } from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild('search') public searchElementRef: ElementRef;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  isLoading: boolean = true;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public selectedAddress: PlaceResult
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    // this.calculateDistance();
  }

  // calculateDistance() {
  //   const mexicoCity = new google.maps.LatLng(19.432608, -99.133209);
  //   const jacksonville = new google.maps.LatLng(40.730610, -73.935242);
  //   const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
  //   console.log(distance, "dist");
  // }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

  onChange(event: MouseEvent) {
    console.log(event, "ev");
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
