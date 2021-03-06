# WidgetsNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## Usage

```angular2html
  npm i @simcu/widgets-ng --save
```

写一个小组件，如下

```angular2html
import {Component} from '@angular/core';

@Component({
  selector: 'app-widget-text',
  template: `
    <sim-widget-base [minWidth]="100" [minHeight]="40" [(properties)]="properties">
      <div style="width: 100%; height: 100%;"
           [ngStyle]="{fontSize: attributes.fontSize.value+'px',color: attributes.fontColor.value,fontWeight: attributes.fontWeight.value?'bold':'',textAlign: attributes.fontAlign.value}">
        {{attributes.content.value}}
      </div>
    </sim-widget-base>
  `
})
export class TextWidgetComponent {
  static meta = {
    id: 'text',
    name: '文本',
    image: 'https://oss.simcu.com/veilan/assets/%E6%96%87%E6%9C%AC.png'
  };

  public properties = {
    name: '未命名',
    zIndex: 10,
    width: 100,
    height: 40,
    left: 0,
    top: 0,
    edit: false
  };

  public attributes = {
    content: {
      name: '内容',
      type: 'text',
      value: '文本内容'
    },
    fontSize: {
      name: '字号',
      type: 'number',
      value: 15
    },
    fontColor: {
      name: '字体颜色',
      type: 'text',
      value: '#000000'
    },
    fontWeight: {
      name: '加粗',
      type: 'bool',
      value: false
    },
    fontAlign: {
      type: 'select',
      name: '对齐方式',
      options: [
        {name: '居中对齐', value: 'center'},
        {name: '左对齐', value: 'left'},
        {name: '右对齐', value: 'right'},
      ],
      value: 'center'
    }

  };

}

```

注册小组件：

```angular2html
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
```

使用开始：

```angular2html
<sim-widget-board [widgets]="widgets" (save)="save($event)"></sim-widget-board>
```
widgets 为要渲染的对象数组

save 为点击保存文档触发的事件，$event 为点击保存时的对象

