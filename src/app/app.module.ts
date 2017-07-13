import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// import { SharedModule } from '@sales-express/shared/shared.module'
import { AppComponent } from '~/app/app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
