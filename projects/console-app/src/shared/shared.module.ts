import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DismissableContentComponent } from './components/dismissable-content/dismissable-content.component';

@NgModule({
  declarations: [DismissableContentComponent],
  imports: [
    CommonModule
  ],
  exports: [DismissableContentComponent]
})
export class SharedModule { }
