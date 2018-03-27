import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './barchart/barchart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import {DemoComponent} from "./demo/demo.component";
import {WaterfallChartComponent} from './water-fall/water-fall.component';
const appRoutes: Routes = <Routes>[
  {path: '', component: LinechartComponent, pathMatch: 'full'},
  {
    path: 'line-chart',
    component: WaterfallChartComponent,
  },
  {
    path: 'donut-chart',
    component: DonutChartComponent
  },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: 'multi-line-chart',
    component: MultiLineChartComponent
  },
  {
    path: 'stacked-bar-chart',
    component: StackedBarChartComponent
  },
  {
    path: 'area-chart',
    component: AreaChartComponent
  },
  {
    path: 'grouped-bar-chart',
    component: GroupedBarChartComponent
  },
  {
    path: 'app-demo',
    component: DemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
