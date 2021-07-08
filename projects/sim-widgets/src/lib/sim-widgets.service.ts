import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {ReplaySubject} from 'rxjs';

export const WIDGETS = new InjectionToken('custom_widgets');

@Injectable({
  providedIn: 'root'
})
export class SimWidgetsService {
// 配置所有插件
  private componentMap = {};
  public selectedWidgetId$ = new ReplaySubject<string>(1);

  constructor(@Optional() @Inject(WIDGETS) widgets?: Array<any>) {
    for (const component of widgets) {
      this.componentMap[component.meta.id] = component;
    }
  }

  getComponent(type: string): any {
    if (Object.keys(this.componentMap).indexOf(type) !== -1) {
      return this.componentMap[type];
    } else {
      return null;
    }
  }

  getComponentTypes(): string[] {
    return Object.keys(this.componentMap);
  }

}
