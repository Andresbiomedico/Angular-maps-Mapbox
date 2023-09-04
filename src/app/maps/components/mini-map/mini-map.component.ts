import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{
  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?:[number,number];
  public  map?: Map;

  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw "Map div  not found";
    if(!this.lngLat) throw "lngLat can't be null";

    
    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14,// starting zoom
      interactive:false  // dont move the mao
    });

    const marker = new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }


}
