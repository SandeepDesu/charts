import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinechartComponent } from './linechart.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LinechartComponent],
  exports: [LinechartComponent]
})
export class LinechartModule { }
