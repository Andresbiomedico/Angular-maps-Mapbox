import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

interface MarkerAndColor {
  color: string,
  marker: Marker
}
interface PlainMarker{
  color:string,
  lngLat:number[]
}

@Component({
  templateUrl: './markers-pages.component.html',
  styleUrls: ['./markers-pages.component.css']
})
export class MarkersPagesComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat = new LngLat(-74.08, 4.650)
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage()
    ////////////////////////////////////////////////////////////////////////////////
    // Crear marcadores personalidas agregando un html o un color al marcador

    // const markerHtml = document.createElement('div')
    // markerHtml.innerHTML = 'Andres Aristizabal'
    // const marker = new Marker({
    //   // color:'red',
    //   element:markerHtml
    // })
    // .setLngLat(this.currentLngLat)
    // .addTo(this.map)

    //////////////////////////////////////////////////////////////////////////////////
  }


  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ marker, color });
    this.saveToLocalStorage();

    marker.on('dragend',(ev)=> this.saveToLocalStorage());
  }

  createMarker() {
    if (!this.map) return;

    // random color
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const lgnLat = this.map!.getCenter();
    this.addMarker(lgnLat, color);
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index,1);

    this.saveToLocalStorage()

  }

  flyTo(marker:Marker){
    this.map?.flyTo({
      zoom:16,
      center:marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    // if(this.markers.length === 0) return;
    const plainMarkers:PlainMarker[] = this.markers.map(({color,marker})=>{
      console.log(marker.getLngLat())
      return {
        color:color,
        lngLat:marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers',JSON.stringify(plainMarkers))
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'

    const plainMarkers = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }: PlainMarker) => {
      const [lng,lat] = lngLat
      const coords = new LngLat(lng,lat)
      this.addMarker(coords,color)
    });
  }



}
