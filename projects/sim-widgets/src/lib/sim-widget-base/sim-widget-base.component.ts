import {
  ElementRef,
  EventEmitter,
  Component,
  Input,
  Output,
  OnInit
} from '@angular/core';
import {WidgetEditorParameter, WidgetProperty} from '../sim-widgets.model';
import {SimWidgetsService} from '../sim-widgets.service';

@Component({
  selector: 'sim-widget-base',
  templateUrl: './sim-widget-base.component.html',
  styleUrls: ['./sim-widget-base.component.css']
})
export class SimWidgetBaseComponent implements OnInit {

  constructor(protected elementRef: ElementRef, private ws: SimWidgetsService) {
  }

  @Input() properties: WidgetProperty;
  @Output() propertiesChange = new EventEmitter<WidgetProperty>();
  @Input() minWidth = 10;
  @Input() minHeight = 10;
  @Input() maxWidth = 0;
  @Input() maxHeight = 0;
  @Input() resizable = true;
  @Input() editor: WidgetEditorParameter;
  draggableArea: HTMLElement;
  originalPosition = null;
  isSelected = false;

  ngOnInit(): void {
    this.ws.selectedWidgetId$.subscribe(x => {
      this.isSelected = this.editor.id === x;
    });
    if (this.properties.width <= 0) {
      this.properties.width = this.minWidth;
    }
    if (this.properties.height <= 0) {
      this.properties.height = this.minHeight;
    }
    this.draggableArea = this.elementRef.nativeElement.parentElement.parentElement;
    this.originalPosition = {x: this.properties.left, y: this.properties.top};
    const draggableAreaWidth = Number(this.draggableArea.style.width.replace('px', ''));
    if (this.maxWidth === 0 || this.maxWidth > draggableAreaWidth) {
      this.maxWidth = draggableAreaWidth;
    }
    const draggableAreaHeight = Number(this.draggableArea.style.height.replace('px', ''));
    if (this.maxHeight === 0 || this.maxHeight > draggableAreaHeight) {
      this.maxHeight = draggableAreaHeight;
    }
  }

  onMoving(event): void {
    this.properties.left = event.x;
    this.properties.top = event.y;
    this.propertiesChange.emit(this.properties);
  }

  onResizing(event): void {
    this.properties.width = event.size.width;
    this.properties.height = event.size.height;
    this.propertiesChange.emit(this.properties);
  }
}
