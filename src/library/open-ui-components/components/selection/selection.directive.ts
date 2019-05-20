import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[wuiMinSelection]',
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
