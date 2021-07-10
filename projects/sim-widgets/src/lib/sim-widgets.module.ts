import {ModuleWithProviders, NgModule} from '@angular/core';
import {SimWidgetBaseComponent} from './sim-widget-base/sim-widget-base.component';
import {SimWidgetBoardComponent} from './sim-widget-board/sim-widget-board.component';
import {SimWidgetsService, WIDGETS} from './sim-widgets.service';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {AngularDraggableModule} from 'angular2-draggable';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {PlusOutline, EditOutline, SaveOutline} from '@ant-design/icons-angular/icons';
import {FormsModule} from '@angular/forms';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {SimWidgetNotFoundComponent} from './sim-widget-not-found/sim-widget-not-found.component';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzTagModule} from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [
    SimWidgetBaseComponent,
    SimWidgetBoardComponent,
    SimWidgetNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzMessageModule,
    NzFormModule,
    NzTabsModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    NzModalModule,
    NzIconModule,
    NzCollapseModule,
    AngularDraggableModule,
    FormsModule,
    NzEmptyModule,
    NzSelectModule,
    NzRadioModule,
    NzInputNumberModule,
    NzTagModule
  ],
  providers: [
    SimWidgetsService,
    {provide: NZ_ICONS, useValue: [PlusOutline, EditOutline, SaveOutline]}
  ],
  exports: [
    SimWidgetBoardComponent,
    SimWidgetBaseComponent
  ]
})
export class SimWidgetsModule {
  static forRoot(widgets: Array<any>): ModuleWithProviders<SimWidgetsModule> {
    return {
      ngModule: SimWidgetsModule,
      providers: [
        {
          provide: WIDGETS,
          useValue: widgets
        }
      ]
    };
  }
}
