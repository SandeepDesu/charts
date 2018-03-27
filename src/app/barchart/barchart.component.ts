import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DisplayComponent } from "../dynamic-display/IDisplayComponent";
import { MultiPeriodChart } from "../DataBuilders";
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarChartComponent extends DisplayComponent<MultiPeriodChart> implements OnInit {

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  public data: any;

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
      this.drawBars();
    }
  }

  private initSvg() {
    this.svg = d3.select('#bar-chart > svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    d3.selectAll('#bar-chart>svg').attr('width', '100%');
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.map((d) => d.x));
    this.y.domain([0, d3Array.max(this.data, (d) => d.y)]);
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).tickFormat((d) => d / 10000))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');
  }

  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.x))
      .attr('y', (d) => this.y(d.y))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.y));
  }
}
