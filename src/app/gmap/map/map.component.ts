import { Component, OnInit } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'Google Maps';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string = '';
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
      country: ['AZ'],
    },
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
      name: 'Bolt',
      icon: 'bolt.png',
      contact: 'baku@bolt.eu',
      minPaymentPerKm: 0.55,
      maxPaymentPerkm: 0.28,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 2,
      name: 'Uber',
      icon: 'uber.png',
      contact: '070 333 95 95',
      minPaymentPerKm: 0.55,
      maxPaymentPerkm: 0.28,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 3,
      name: 'Maxim',
      icon: 'maxim.png',
      contact: '*2111 və ya *3399',
      minPaymentPerKm: 0.60,
      maxPaymentPerkm: 0.70,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 4,
      name: 'Omega',
      icon: 'omega.png',
      contact: '*0404',
      minPaymentPerKm: 0.55,
      maxPaymentPerkm: 0.28,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 5,
      name: '189 Taxi',
      icon: '189Taxi.jpg',
      contact: '189',
      minPaymentPerKm: 0.60,
      maxPaymentPerkm: 0.70,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 6,
      name: 'Qərb Taxi',
      icon: 'qerb.png',
      contact: '158',
      minPaymentPerKm: 0.55,
      maxPaymentPerkm: 0.28,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 7,
      name: 'Salam Taxi',
      icon: 'salamTaxi.png',
      contact: '*9933',
      minPaymentPerKm: 0.60,
      maxPaymentPerkm: 0.70,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 8,
      name: 'Ekonom Taxi',
      icon: 'ekonom.jpg',
      contact: '*9111',
      minPaymentPerKm: 0.60,
      maxPaymentPerkm: 0.70,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 9,
      name: '1Taxi',
      icon: '1Taxi.jpg',
      contact: '+994 50-607-0-111',
      minPaymentPerKm: 0.60,
      maxPaymentPerkm: 0.70,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
    {
      id: 10,
      name: 'Ailə Taxi',
      icon: 'aileTaksi.png',
      contact: '*8555',
      minPaymentPerKm: 0.55,
      maxPaymentPerkm: 0.28,
      minPrice: 0,
      maxPrice: 0,
      time: 0,
    },
  ];

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  handleAddressChangeCurrent(event) {
    this.origin = {
      lat: event.geometry.location.lat(),
      lng: event.geometry.location.lng(),
    };
    // this.onChange(event, 'c');
    console.log('cur');
  }

  handleAddressChangeDest(event) {
    this.destination = {
      lat: event.geometry.location.lat(),
      lng: event.geometry.location.lng(),
    };
    this.onChange(event, 'c');
    console.log('des');
  }

  onChange(event: any, code: string) {
    this.showPolylines = true;
    this.origin = { lat: this.latitude, lng: this.longitude };
    this.destination =
      code === 'c'
        ? {
          lat: event.geometry.location.lat(),
          lng: event.geometry.location.lng(),
        }
        : (this.destination = { lat: event.coords.lat, lng: event.coords.lng });
  }

  changePolyline(event: any) {
    this.distance = event.routes[0].legs[0].distance.text;
    this.time = event.routes[0].legs[0].duration.text;

    this.taxiCompanies.forEach((element) => {
      if (parseInt(this.distance) < 5) {
        element.minPrice = element.maxPaymentPerkm * parseInt(this.distance);
      } else {
        element.minPrice = element.minPaymentPerKm * parseInt(this.distance);
      } 
      if (element.minPrice == 0) {
        element.minPrice = 1
      } else {
        element.maxPrice = Math.ceil(element.minPrice);
        element.minPrice = Math.floor(element.minPrice);
      }

      element.time = this.time;
    });
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
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
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
      }
    );
  }

}
