import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MultiPeriodChart } from '../DataBuilders';
import { barData, lineChart, donutData, multiLineChartData, stackedBarChartData, groupedBarChartData, areaChartData, waterfallChartData } from "../example";
import * as d3 from 'd3';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})

export class DemoComponent implements OnInit {
  barData: MultiPeriodChart;
  lineData: MultiPeriodChart;
  areaData: MultiPeriodChart;
  donutData: MultiPeriodChart;
  groupedData: MultiPeriodChart;
  multilineData: MultiPeriodChart;
  slackedData: MultiPeriodChart;
  waterfallData: MultiPeriodChart;
  constructor(private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.barData = new MultiPeriodChart(barData, 'Kick Ass Bar Chart');
    this.lineData = new MultiPeriodChart(lineChart, "Kick ass Line Chart");
    this.areaData = new MultiPeriodChart(areaChartData, "Kick ass Area Chart");
    this.donutData = new MultiPeriodChart(donutData, "Kick ass Donut Chart");
    this.groupedData = new MultiPeriodChart(groupedBarChartData, "Kick ass Grouped Bar Chart");
    this.multilineData = new MultiPeriodChart(multiLineChartData, "Kick ass Multi Line Chart");
    this.slackedData = new MultiPeriodChart(stackedBarChartData, "Kick ass Stacked Bar Chart");
    this.waterfallData = new MultiPeriodChart(waterfallChartData, "Kick ass Water fall Chart");
    
  }

}
