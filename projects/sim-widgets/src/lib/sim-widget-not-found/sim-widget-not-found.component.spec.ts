import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimWidgetNotFoundComponent } from './sim-widget-not-found.component';

describe('SimWidgetNotFoundComponent', () => {
  let component: SimWidgetNotFoundComponent;
  let fixture: ComponentFixture<SimWidgetNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimWidgetNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimWidgetNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
