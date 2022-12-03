import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OverviewComponent} from "./overview/overview.component";
import {DetailsComponent} from "./details/details.component";


const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'details', component: DetailsComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
