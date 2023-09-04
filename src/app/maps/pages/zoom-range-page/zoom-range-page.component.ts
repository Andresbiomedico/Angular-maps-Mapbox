import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import {LngLat, Map} from 'mapbox-gl'

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit,OnDestroy {
  ngOnDestroy(): void {
    this.map?.remove();
  }

  @ViewChild('map') divMap?: ElementRef

  public zoom:number = 10;
  public map?:Map;
  public currentLngLat = new LngLat(-74.08,4.650)

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  zoomOut(){
    this.map?.zoomOut()
  }

  zoomIn(){
    this.map?.zoomIn()
  }

  mapListeners(){
    if(!this.map) throw 'Mapa no Inicializado'

    this.map.on('zoom',(ev)=> {
      this.zoom = this.map!.getZoom();
    })


    this.map.on('zoomend',(ev)=> {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    })

    this.map.on('move',()=>{
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom)
  }

}
