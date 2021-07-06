export interface WidgetMeta {
  id: string;
  name: string;
  image: string;
  group: string;
}

export interface WidgetProperty {
  name: string;
  zIndex: number;
  width: number;
  height: number;
  left: number;
  top: number;
  edit: boolean;
}


export interface WidgetAttributes {
  [key: string]: WidgetAttributeItem;
}

export interface WidgetAttributeItem {
  name: string;
  type: string;
  value: any;

  [key: string]: any;
}
