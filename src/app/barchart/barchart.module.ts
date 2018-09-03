import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './barchart.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BarChartComponent],
  exports: [BarChartComponent]
})
export class BarchartModule { }
