import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OverviewComponent} from './overview/overview.component';
import {DetailsComponent} from './details/details.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {SnowflakesComponent} from "./snowflakes/snowflakes.component";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SnowflakesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
