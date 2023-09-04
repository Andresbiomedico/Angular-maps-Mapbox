import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Map} from 'mapbox-gl'

@Component({
  templateUrl: './full-screen-pge.component.html',
  styleUrls: ['./full-screen-pge.component.css']
})
export class FullScreenPgeComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'elemento HTML no fue encontrado'

    console.log(this.divMap)
    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }


}
