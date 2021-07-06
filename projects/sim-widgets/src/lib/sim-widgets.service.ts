import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';

export const WIDGETS = new InjectionToken('custom_widgets');

@Injectable({
  providedIn: 'root'
})
export class SimWidgetsService {
// 配置所有插件
  private componentMap = {};

  constructor(@Optional() @Inject(WIDGETS) widgets?: Array<any>) {
    for (const component of widgets) {
      this.componentMap[component.meta.id] = component;
    }
  }

  getComponent(type: string): any {
    return this.componentMap[type];
  }

  getComponentTypes(): string[] {
    return Object.keys(this.componentMap);
  }
}
