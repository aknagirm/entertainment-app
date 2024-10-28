import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NavigationComponent } from './navigation/navigation.component'
import { BodyComponent } from './body/body.component'
import { HttpClientModule } from '@angular/common/http'
import { StringTrimPipe } from './pipe/string-trim.pipe'
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BodyComponent,
    StringTrimPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
