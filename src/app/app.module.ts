import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {OverviewComponent} from './overview/overview.component';
import {DetailsComponent} from './details/details.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { GroupsComponent } from './groups/groups.component';
// import {SnowflakesComponent} from "./snowflakes/snowflakes.component";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailsComponent,
    GroupsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    RouterModule,
    // SnowflakesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
