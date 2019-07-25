import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'wuiMinSelection',
  providers: [{provide: NG_VALIDATORS, useExisting: SelectionValidatorDirective, multi: true}]
})
export class SelectionValidatorDirective implements Validator {
  @Input('wuiMinSelection') minSelection: number;

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (Array.isArray(control.value) && control.value.length < this.minSelection) {
      return {minSelection: this.minSelection};
    }
    return null;
  }
}
