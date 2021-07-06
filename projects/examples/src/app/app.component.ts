import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <sim-widget-board [widgets]="widgets" (save)="save($event)"></sim-widget-board>
  `,
  styles: []
})
export class AppComponent {
  widgets: any;

  save(widgets: any): void {
    console.log(widgets);
  }
}
