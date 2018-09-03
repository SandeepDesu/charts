import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLineChartComponent } from './multi-line-chart.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MultiLineChartComponent],
  exports: [MultiLineChartComponent]
})
export class MultiLineChartModule { }
