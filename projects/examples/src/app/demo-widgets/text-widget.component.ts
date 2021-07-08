import {Component} from '@angular/core';
import {WidgetEditorParameter} from '../../../../sim-widgets/src/lib/sim-widgets.model';

@Component({
  selector: 'app-widget-text',
  template: `
    <sim-widget-base [minWidth]="100" [minHeight]="40" [(properties)]="properties" [editor]="editor">
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

  actions = {
    test: () => {
      console.log(this.properties);
    }
  };

  public attributes = {
    test: {
      name: '按钮测试按钮测试',
      type: 'action',
      value: 'test'
    },
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
