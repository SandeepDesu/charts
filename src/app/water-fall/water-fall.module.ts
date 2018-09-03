import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterfallChartComponent } from './water-fall.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WaterfallChartComponent],
  exports: [WaterfallChartComponent]
})
export class WaterFallModule { }
