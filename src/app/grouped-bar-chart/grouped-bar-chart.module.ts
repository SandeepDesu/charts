import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupedBarChartComponent } from './grouped-bar-chart.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GroupedBarChartComponent],
  exports: [GroupedBarChartComponent]
})
export class GroupedBarChartModule { }
