import {Component} from '@angular/core';

@Component({
  selector: 'app-widget-image',
  template: `
    <sim-widget-base [minWidth]="160" [minHeight]="90" [(properties)]="properties">
      <div [ngStyle]="{backgroundImage: 'url('+attributes.image.value+')', backgroundRepeat: attributes.fit.value
     ,backgroundSize: calcSize(attributes.fit.value), width: '100%',height:'100%'}"></div>
    </sim-widget-base>
  `
})
export class ImageWidgetComponent {
  static meta = {
    id: 'image',
    name: '图片',
    image: 'https://oss.simcu.com/veilan/assets/%E5%9B%BE%E7%89%87.png'
  };

  properties = {
    name: '未命名',
    zIndex: 10,
    width: 160,
    height: 90,
    left: 0,
    top: 0,
    edit: false
  };

  attributes = {
    image: {
      type: 'image',
      name: '图片',
      value: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2091892350,4264162613&fm=26&gp=0.jpg'
    },
    fit: {
      type: 'select',
      name: '展现方式',
      options: [
        {name: '不重复', value: 'no-repeat'},
        {name: '水平重复', value: 'repeat-x'},
        {name: '垂直重复', value: 'repeat-y'},
        {name: '垂直和水平重复', value: 'repeat'}
      ],
      value: 'no-repeat'
    }
  };

  calcSize(fit: string): string {
    let size: string;
    switch (fit) {
      case 'repeat-x':
        size = 'auto 100%';
        break;
      case 'repeat-y':
        size = '100% auto';
        break;
      case 'repeat':
        size = 'auto auto';
        break;
      case 'no-repeat':
        size = '100% 100%';
        break;
    }
    return size;
  }
}
