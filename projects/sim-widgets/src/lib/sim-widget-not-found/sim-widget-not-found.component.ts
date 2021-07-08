import {Component, OnInit} from '@angular/core';
import {WidgetEditorParameter} from '../sim-widgets.model';

@Component({
  selector: 'lib-sim-widget-not-found',
  templateUrl: './sim-widget-not-found.component.html',
  styleUrls: ['./sim-widget-not-found.component.css']
})
export class SimWidgetNotFoundComponent implements OnInit {
  static meta = {
    id: 'text',
    name: '文本',
    image: 'https://oss.simcu.com/veilan/assets/%E6%96%87%E6%9C%AC.png'
  };
  editor: WidgetEditorParameter;
  public properties = {
    name: '未命名',
    zIndex: 10,
    width: 100,
    height: 40,
    left: 0,
    top: 0,
    edit: false
  };

  public attributes = {};

  public rawData: any;

  public rawJson: string;

  ngOnInit(): void {
    this.rawJson = JSON.stringify(this.rawData);
  }
}
