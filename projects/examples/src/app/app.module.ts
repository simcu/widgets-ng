import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ImageWidgetComponent} from './demo-widgets/image-widget.component';
import {TextWidgetComponent} from './demo-widgets/text-widget.component';
import {SimWidgetsModule} from '../../../sim-widgets/src/lib/sim-widgets.module';

@NgModule({
  declarations: [
    AppComponent,
    ImageWidgetComponent,
    TextWidgetComponent
  ],
  imports: [
    BrowserModule,
    SimWidgetsModule.forRoot([ImageWidgetComponent, TextWidgetComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
