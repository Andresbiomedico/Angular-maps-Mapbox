import { Component } from '@angular/core';

interface MenuIem {
  name:string;
  route:string
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItems :MenuIem [] = [
    {route:'/maps/fullscreen',name:'FullScreen'},
    {route:'/maps/zoom-range',name:'Zoom-Range'},
    {route:'/maps/markers',name:'Markers'},
    {route:'/maps/properties',name:'Houses'},
  ]
}
