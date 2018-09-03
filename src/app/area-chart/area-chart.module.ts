import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaChartComponent } from './area-chart.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AreaChartComponent],
  exports: [AreaChartComponent]
})
export class AreaChartModule { }
