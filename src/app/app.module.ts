import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { BarChartComponent } from './barchart/barchart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import {AppRoutingModule} from './app.routing.module';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import {DynamicDirective} from "./dynamic-display/DynamicContent.directive";
import {PopUpComponent} from "./pop-up/pop-up.component";
import { DemoComponent } from './demo/demo.component';
import {WaterfallChartComponent} from './water-fall/water-fall.component';
@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    BarChartComponent,
    DonutChartComponent,
    MultiLineChartComponent,
    StackedBarChartComponent,
    AreaChartComponent,
    StackedBarChartComponent,
    GroupedBarChartComponent,
    PopUpComponent,
    DynamicDirective,
    DemoComponent,
    WaterfallChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
