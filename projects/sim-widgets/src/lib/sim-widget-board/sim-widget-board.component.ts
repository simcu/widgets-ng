import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  EventEmitter,
  ViewContainerRef,
  Renderer2, ComponentRef, Input, Output, OnChanges, SimpleChanges
} from '@angular/core';
import {SimWidgetsService} from '../sim-widgets.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {WidgetMeta} from '../sim-widgets.model';
import {SimWidgetNotFoundComponent} from '../sim-widget-not-found/sim-widget-not-found.component';

@Component({
  selector: 'sim-widget-board',
  templateUrl: './sim-widget-board.component.html',
  styleUrls: ['./sim-widget-board.component.css']
})
export class SimWidgetBoardComponent implements OnChanges {
  @Input() widgets: Array<any> = [
    {name: '未命名', data: [], editorId: null, width: 1600, height: 900},
  ];
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  @Input() showEditButton = true;
  @Output() save = new EventEmitter<Array<any>>();
  @Input() extra = {};
  @Input() extraActions = [];
  @ViewChild('editor', {read: ViewContainerRef, static: true}) editor: ViewContainerRef;
  selectedIndex = 0;
  scale = 1;
  objectValues = Object.values;
  uploadLoading = false;
  selected: ComponentRef<any> = null;
  currentView = {name: '未命名', data: [], width: 1600, height: 900};

  constructor(private modal: NzModalService, private message: NzMessageService, private cfr: ComponentFactoryResolver,
              private renderer: Renderer2, public ws: SimWidgetsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.widgets) {
      if (!this.widgets || !Array.isArray(this.widgets)) {
        this.widgets = [
          {name: '未命名', data: [], width: 1600, height: 900},
        ];
      }
      this.tabChange(this.widgets[this.selectedIndex]);
    }
    if (changes.editMode) {
      if (changes.editMode.previousValue !== changes.editMode.currentValue) {
        if (changes.editMode.currentValue) {
          this.tabChange(this.currentView);
        } else {
          this.saveHandler();
        }
      }
    }
  }

  doEdit(): void {
    this.editMode = true;
    this.editModeChange.emit(true);
  }

  doSave(): void {
    this.editMode = false;
    this.editModeChange.emit(false);
  }

  saveHandler(): void {
    for (const item of this.widgets) {
      for (const itemData of item.data) {
        delete itemData.editorId;
        delete itemData.properties.edit;
      }
    }
    this.save.emit(this.widgets);
    this.tabChange(this.currentView);
  }

  get selectedAttrGroups(): string[] {
    const hash = [];
    for (const item of Object.values(this.selected.instance.attributes) as WidgetMeta[]) {
      if (!item.group) {
        item.group = '属性';
      }
      if (hash.indexOf(item.group) === -1) {
        hash.push(item.group);
      }
    }
    return hash;
  }

  pageClick(): void {
    this.selected = null;
    this.ws.selectedWidgetId$.next(null);
  }

  tabChange(comps: any): void {
    setTimeout(() => {
      this.selected = null;
      this.currentView = comps;
      const temp = JSON.parse(JSON.stringify(comps));
      this.currentView.data = [];
      this.editor.clear();
      if (temp.data.length > 0) {
        for (const item of temp.data) {
          this.addComponent(item);
        }
      }
    });
  }

  addComponent(data: any): void {
    if (!data.type) {
      return;
    }
    const comp = this.ws.getComponent(data.type) ?? SimWidgetNotFoundComponent;
    const inst = this.cfr.resolveComponentFactory(comp);
    const cIns = this.editor.createComponent(inst) as typeof comp;
    if (data.attributes && comp !== SimWidgetNotFoundComponent) {
      for (const attr of Object.keys(data.attributes)) {
        cIns.instance.attributes[attr].value = data.attributes[attr].value;
      }
    }
    if (data.properties) {
      cIns.instance.properties = data.properties;
    }
    cIns.instance.editor = {
      id: this.randomString(),
      editMode: this.editMode
    };
    cIns.instance.extra = this.extra;
    this.renderer.listen(cIns.location.nativeElement, 'click', (event) => {
      event.stopPropagation();
      this.selected = cIns;
      this.ws.selectedWidgetId$.next(cIns.instance.editor.id);
    });
    this.renderer.listen(cIns.location.nativeElement, 'mousedown', (event) => {
      event.stopPropagation();
      this.selected = cIns;
      this.ws.selectedWidgetId$.next(cIns.instance.editor.id);
    });
    if (comp === SimWidgetNotFoundComponent) {
      cIns.instance.rawData = data;
    }
    this.currentView.data.push({
      editorId: cIns.instance.editor.id,
      attributes: comp === SimWidgetNotFoundComponent ? data.attributes : cIns.instance.attributes,
      properties: cIns.instance.properties,
      type: data.type,
      conditions: cIns.instance?.conditions
    });
  }

  randomString(len = 8): string {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  deleteComponent(component: any): void {
    for (const item of this.currentView.data) {
      if (item.editorId === component.instance.editor.id) {
        const index = this.currentView.data.indexOf(item);
        this.currentView.data.splice(index, 1);
        break;
      }
    }
    component.destroy();
    this.selected = null;
  }

  deleteShow(s): void {
    if (this.widgets.length === 1) {
      this.message.warning('最后一个不能删除哦！');
      return;
    }
    this.modal.confirm({
      nzTitle: '删除确认',
      nzContent: `即将删除 <b style="color: red;">${s.name}</b> ,删除不可逆转，确定吗？`,
      nzOkText: '确认删除',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.widgets = this.widgets.filter(x => x !== s);
        this.tabChange(this.widgets[0]);
      },
      nzCancelText: '取消',
    });
  }

  newShow(): void {
    this.widgets.push({name: '页面' + this.randomString(4), data: [], width: 1600, height: 900});
  }

  upload(event, attr): void {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      // this.api.query('/view/upload/image', {base64: reader.result}).then(resp => {
      //   attr.value = resp.data;
      // });
    };
  }
}
