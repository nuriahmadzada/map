import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Google Maps';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string = "";
  private geoCoder;
  isLoading: boolean = true;
  origin: any;
  destination: any;
  showPolylines: boolean;
  distance: any;
  time: any;
  adres: string;
  price: number;
  options = {
    componentRestrictions: {
      country: ['AZ']
    }
  };
  renderOptions = {
    suppressMarkers: true,
  };
  markerOptions = {
    origin: {
      draggable: true,
    },
    destination: {
      draggable: true,
      opacity: 0.6,
    },
  };

  taxiCompanies = [
    {
      id: 1,
      name: "Bolt",
      icon: "bolt.png",
      contact: "070 283-4525",
      minPaymentPerKm: 0.34,
      maxPaymentPerkm: 1.328,
      price: 0,
      time: 0
    },
    {
      id: 2,
      name: "Uber",
      icon: "uber.png",
      contact: "070 283-4525",
      minPaymentPerKm: 0.27,
      maxPaymentPerkm: 1.719,
      price: 0,
      time: 0
    },
    {
      id: 3,
      name: "Maxim",
      icon: "maxim.png",
      contact: "070 283-4525",
      minPaymentPerKm: 0.48,
      maxPaymentPerkm: 1.129,
      price: 0,
      time: 0
    }
  ]

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  handleAddressChangeCurrent(event) {
    this.origin = { lat: event.geometry.location.lat(), lng: event.geometry.location.lng() };
    // this.onChange(event, 'c');
    console.log("cur");

  }

  handleAddressChangeDest(event) {
    this.destination = { lat: event.geometry.location.lat(), lng: event.geometry.location.lng() };
    this.onChange(event, 'c');
    console.log("des");

  }

  onChange(event: any, code: string) {
    this.showPolylines = true;
    this.origin = { lat: this.latitude, lng: this.longitude };
    this.destination = code === 'c' ? { lat: event.geometry.location.lat(), lng: event.geometry.location.lng() } :
      this.destination = { lat: event.coords.lat, lng: event.coords.lng };
  }

  changePolyline(event: any) {
    this.distance = event.routes[0].legs[0].distance.text;
    this.time = event.routes[0].legs[0].duration.text;

    this.taxiCompanies.forEach(element => {
      if (parseInt(this.distance) > 3) {
        element.price = element.maxPaymentPerkm * parseInt(this.distance);
      }
      else {
        element.price = element.minPaymentPerKm * parseInt(this.distance);
      }
      element.time = this.time
    })
  }

  setCurrentLocation() {
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
