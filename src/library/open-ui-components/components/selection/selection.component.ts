import {
  Component,
  OnInit,
  Directive,
  Optional,
  HostBinding,
  ViewEncapsulation,
  Input,
  ContentChildren,
  forwardRef,
  QueryList,
  AfterContentInit
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: 'wui-selection-group',
  providers: [
    SelectionGroupDirective,
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectionGroupDirective), multi: true }
  ],
  exportAs: 'wuiSelectionGroup',
})
export class SelectionGroupDirective implements ControlValueAccessor, AfterContentInit {
  @HostBinding('class.wui-selection-group') private __ = true;
  @HostBinding('style.margin') hostMargin: string;

  @Input() type: 'selection-list' | 'selection-collection' = 'selection-list';
  @Input() columns = 2;
  @Input() maxSelection: any = 1;
  @Input() selectedBorderColor: string;
  @Input() disabled = false;

  // tslint:disable-next-line: no-use-before-declare
  @ContentChildren(forwardRef(() => SelectionComponent)) selections: QueryList<SelectionComponent>;

  ngAfterContentInit() {
    if (this.maxSelection === 'all') {
      this.maxSelection = this.selections.length;
    }
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => any = () => {};

  get selectedSelections() {
    if (!this.selections) {
      return [];
    }
    return this.selections.filter(selection => selection.selected);
  }

  @Input()
  get value(): any[] {
    return this.selectedSelections.map(selection => selection.value);
  }
  set value(newValue: any[]) {
    this.writeValue(newValue);
  }

  writeValue(obj: any): void {
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

@Component({
  selector: 'wui-selection-group-styler',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    .wui-selection-group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 60.0rem;
      position: relative;
    }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class SelectionWrapperComponent { }

@Component({
  selector: 'wui-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  private pad = 0.5;

  @HostBinding('style.padding') hostPadding = `${this.pad}rem`;
  @HostBinding('style.height') hostHeight: string;
  @HostBinding('style.width') hostWidth: string;

  @Input() value: any;

  selectedBorderColor: string;

  // Default to Perx color palette
  private defaultSelectedBorderColor = '#1996d3';
  private isSelected = false;

  constructor(@Optional() private selectionGroup: SelectionGroupDirective) {
  }

  ngOnInit() {
    const type = this.selectionGroup && this.selectionGroup.type || 'selection-list';
    this.hostWidth = type === 'selection-list' ?
      `calc(100% - ${2 * this.pad}rem)` :
      `calc(${100 / this.selectionGroup.columns}% - ${2 * this.pad}rem)`;
    this.hostHeight = type === 'selection-list' ? '7rem' : '15rem';

    if (!this.selectedBorderColor) {
      if (this.selectionGroup && this.selectionGroup.selectedBorderColor) {
        this.selectedBorderColor = this.selectionGroup.selectedBorderColor;
      } else {
        this.selectedBorderColor = this.defaultSelectedBorderColor;
      }
    }

    if (this.selectionGroup && !(this.selectionGroup.hostMargin)) {
      this.selectionGroup.hostMargin = `${this.pad}rem`;
    }
  }

  onClick() {
    if (this.selectionGroup) {
      this.selectionGroup.onTouched();
    }
    if (!this.selected && this.selectionGroup &&
      this.selectionGroup.maxSelection > 1 &&
      this.selectionGroup.selectedSelections.length >= this.selectionGroup.maxSelection) {
      return;
    }

    if (this.selectionGroup && this.selectionGroup.maxSelection === 1) {
      this.selectionGroup.selectedSelections.forEach(selection => selection.selected = false);
    }

    this.isSelected = !this.isSelected;
    if (this.selectionGroup) {
      this.selectionGroup.writeValue(this.isSelected);
    }
  }

  get selected() {
    return this.isSelected;
  }

  set selected(selected: boolean) {
    this.isSelected = selected;
  }

  get borderStyles() {
    return this.isSelected ? {
      'border-color': this.selectedBorderColor,
      'border-width': '0.2rem'
    } : undefined;
  }

  get type() {
    return (this.selectionGroup && this.selectionGroup.type) || 'selection-list';
  }
}
