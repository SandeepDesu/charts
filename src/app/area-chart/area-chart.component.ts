import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as deArea from 'd3-shape';
import { DisplayComponent } from "../dynamic-display/IDisplayComponent";
import { MultiPeriodChart } from "../DataBuilders";

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})

export class AreaChartComponent extends DisplayComponent<MultiPeriodChart> implements OnInit {
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private area: any;
  private data;

  constructor() {
    super();
  }
  protected loadData(): void {
    if (this.Source) {
      this.data = this.Source.getData();
    }
  }

  ngOnInit() {
    this.loadData();
    if (this.data) {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
    }
  }

  private initSvg() {
    this.svg = d3.select('#areaChart>svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    d3.selectAll('#areaChart>svg').attr('width', '100%');
    this.x = d3Scale.scaleLinear().rangeRound([0, this.width]);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.area = deArea.area().x((d) => this.x(d.x))
      .y1((d) => this.y(d.y));
    this.x.domain(d3Array.extent(this.data, (d) => d.x));
    this.y.domain([0, d3Array.max(this.data, (d) => d.y)]);
    this.area.y0(this.y(0));
  }

  private drawAxis() {
    this.g.append('path')
      .datum(this.data)
      .attr('fill', 'steelblue')
      .attr('d', this.area);

    this.g.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x).ticks(5));

    this.g.append('g')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');
  }
}
