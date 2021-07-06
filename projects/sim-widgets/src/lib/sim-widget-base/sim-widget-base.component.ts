import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Component,
  Input,
  Output,
  OnInit
} from '@angular/core';
import {WidgetProperty} from '../sim-widgets.model';

@Component({
  selector: 'sim-widget-base',
  templateUrl: './sim-widget-base.component.html',
  styleUrls: ['./sim-widget-base.component.css']
})
export class SimWidgetBaseComponent implements OnInit {

  constructor(protected elementRef: ElementRef) {
  }

  @Input() properties: WidgetProperty;
  @Output() propertiesChange = new EventEmitter<WidgetProperty>();
  @Input() minWidth = 20;
  @Input() minHeight = 20;
  @Input() maxWidth = 0;
  @Input() maxHeight = 0;
  draggableArea: HTMLElement;
  originalPosition = null;
  originWidth = null;
  originHeight = null;

  ngOnInit(): void {
    if (this.properties.width <= 0) {
      this.properties.width = this.originWidth ? this.originWidth : this.minWidth;
    }
    if (this.properties.height <= 0) {
      this.properties.height = this.originHeight ? this.originHeight : this.minHeight;
    }
    this.draggableArea = this.elementRef.nativeElement.parentElement.parentElement;
    this.originalPosition = {x: this.properties.left, y: this.properties.top};
    if (this.maxWidth === 0 || this.maxWidth > this.elementRef.nativeElement.parentElement.style.width.replace('px', '')) {
      this.maxWidth = this.elementRef.nativeElement.parentElement.style.width.replace('px', '');
    }
    if (this.maxHeight === 0 || this.maxHeight > this.elementRef.nativeElement.parentElement.style.height.replace('px', '')) {
      this.maxHeight = this.elementRef.nativeElement.parentElement.style.height.replace('px', '');
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
