import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-wui-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingComponent), multi: true }
  ],
})
export class RatingComponent implements ControlValueAccessor {
  @Input() maxRating: number = 5;
  @Input() maxLabel: string;
  @Input() minLabel: string;
  @Input() selectedTint: string = '#f2bd42';
  @Input() showValue: boolean = false;
  @Input() icon: string = String.fromCharCode(0xf005);
  @Input() disabled: boolean = false;

  @Output() changeEmit: EventEmitter<{ source: RatingComponent, value: number }> =
    new EventEmitter<{ source: RatingComponent, value: number }>();

  unSelectedTint: string = '#959595';

  ratings: Array<number> = [];

  private selectedIndex: number = -1;

  constructor() {
    this.ratings = Array.from(Array(this.maxRating), (_, i) => i + 1);
  }

  getTint(index: number): string {
    if (index <= this.selectedIndex) {
      return this.selectedTint;
    }
    return this.unSelectedTint;
  }

  onSelect(index: number): void {
    this.onTouched();
    this.value = index + 1;
  }

  onChange: (value: any) => void = () => { };

  onTouched: () => any = () => { };

  @Input()
  get value(): number {
    return this.ratings[this.selectedIndex];
  }
  set value(newValue: number) {
    this.writeValue(newValue);
  }

  writeValue(newValue: number): void {
    if (this.value === newValue) {
      return;
    }
    this.ratings.forEach((rating, index) => {
      if (rating === parseInt(`${newValue}`, 10)) {
        this.selectedIndex = index;
        this.onChange(this.value);
        this.changeEmit.emit({ source: this, value: this.value });
        return;
      }
    });
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
