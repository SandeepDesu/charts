import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DisplayComponent } from "../dynamic-display/IDisplayComponent";
import { MultiPeriodChart } from "../DataBuilders";

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})

export class LinechartComponent extends DisplayComponent<MultiPeriodChart> implements OnInit {
  private margin = { top: 30, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private myOwn = [];
  private g:any;

  constructor() {
    super();
  }

  protected loadData(): void {
    if (this.Source) {
      this.Source.getData().forEach((value, index) => {
        this.myOwn.push({ label: index + 1, value: value.y, display: value.x });
      });
    }
  }

  ngOnInit() {
    this.loadData();
    if (this.myOwn.length) {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    }
  }

  private initSvg() {
    this.svg = d3.select('#line-chart > svg')
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.myOwn, (d) => d.label));
    this.y.domain(d3Array.extent(this.myOwn, (d) => d.value));
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x).tickFormat((d, i) => this.myOwn[i] && this.myOwn[i].display ? this.myOwn[i].display : null));

    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(5))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 7)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.label))
      .y((d: any) => this.y(d.value));

    this.g.append('path')
      .datum(this.myOwn)
      .attr('class', 'line')
      .attr('d', this.line);
  }


}
