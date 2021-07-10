import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ImageWidgetComponent} from './demo-widgets/image-widget.component';
import {TextWidgetComponent} from './demo-widgets/text-widget.component';
import {SimWidgetsModule} from '../../../sim-widgets/src/lib/sim-widgets.module';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ImageWidgetComponent,
    TextWidgetComponent
  ],
  imports: [
    BrowserModule,
    SimWidgetsModule.forRoot([ImageWidgetComponent, TextWidgetComponent]),
    NzPageHeaderModule,
    NzButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
