import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing'
import { HttpModule, Http, RequestOptions } from '@angular/http'
//other modules
import { SESharedModule } from './se-ui-components';
import { HomeModule } from './home/home.module';
// Vendor specific
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PersonService, HTTPPersonService, MockPersonService } from './se-ui-services/person';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    SESharedModule,
    HttpModule,
 // Vendor specific
    NgbModule.forRoot(),
  ],
  providers: [
    { provide: PersonService, useClass: HTTPPersonService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
