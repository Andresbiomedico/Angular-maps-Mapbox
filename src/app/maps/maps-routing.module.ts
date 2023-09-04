import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPgeComponent } from './pages/full-screen-pge/full-screen-pge.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MarkersPagesComponent } from './pages/markers-pages/markers-pages.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';

const routes: Routes = [
  {
    path:'',
    component: MapsLayoutComponent,
    children:[
      {
        path:'fullscreen',component:FullScreenPgeComponent
      },
      {
        path:'zoom-range',component:ZoomRangePageComponent
      },
      {
        path:'markers',component:MarkersPagesComponent
      },
      {
        path:'properties',component:PropertiesPageComponent
      },
      {
        path:'**',redirectTo:'fullscreen'
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
