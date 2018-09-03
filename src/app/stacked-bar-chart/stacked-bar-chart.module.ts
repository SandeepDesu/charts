import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackedBarChartComponent } from './stacked-bar-chart.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StackedBarChartComponent],
  exports: [StackedBarChartComponent]
})
export class StackedBarChartModule { }
