import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Collection from 'd3-collection';
import { DisplayComponent } from "../dynamic-display/IDisplayComponent";
import { MultiPeriodChart } from "../DataBuilders";
import * as _ from 'lodash';
@Component({
  selector: 'app-double-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})
export class GroupedBarChartComponent extends DisplayComponent<MultiPeriodChart> implements OnInit {
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x0: any;
  private x1: any;
  private y: any;
  private z: any;
  private svg: any;
  private g: any;
  private options;
  private maxNumberOfKeys;
  private source = [];

  constructor() {
    super();
  }

  protected loadData(): void {
    if (this.Source) {
      const sourceData = this.Source.getData();
      sourceData.forEach((data) => {
        if (this.source.length > 0) {
          const index = _.findIndex(this.source, { x: data.x });
          if (index === -1) {
            let obj = {};
            obj['x'] = data.x;
            obj[0] = data.y
            this.source.push(obj);
          } else {
            let obj = this.source[index];
            obj[Object.keys(obj).length - 1] = data.y;
            this.source[index] = obj;
          }
        } else {
          let obj = {};
          obj['x'] = data.x;
          obj[0] = data.y
          this.source.push(obj);
        }
      });
    }
  }

  ngOnInit() {
    this.loadData();
    if (this.source.length) {
      const arr = [];
      this.source.forEach((ele) => {
        arr.push(Object.keys(ele).length);
      });
      this.maxNumberOfKeys = arr.indexOf(Math.max(...arr));
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
    }

  }

  private initSvg() {
    this.svg = d3.select('#grouped-chart>svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    d3.selectAll('#grouped-chart>svg').attr('width', '100%');
    this.x0 = d3Scale.scaleBand().range([0, this.width]);
    this.x1 = d3Scale.scaleBand().padding(0.10);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.z = d3Scale.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.options = d3Collection.keys(this.source[this.maxNumberOfKeys]).filter((key) => key !== 'x');
    this.x0.domain(this.source.map((d) => d.x));
    this.x1.domain(this.options).rangeRound([0, this.x0.bandwidth()]);
    this.y.domain([0, d3Array.max(this.source, (d) => d3Array.max(this.options, (key) => { return d[key]; }))]);
  }

  private drawAxis() {

    this.g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x0));

    this.g.append('g')
      .attr('class', 'y axis')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', this.y(this.y.ticks().pop()) + 0.5)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Satisfaction %');
  }

  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.source)
      .enter().append('g')
      .attr('class', 'rect')
      .attr('transform', (d) => 'translate(' + this.x0(d.x) + ',0)')
      .selectAll('rect')
      .data((d) => this.options.map((key) => { return { key: key, value: d[key] ? d[key] : 0 }; }))
      .enter().append('rect')
      .attr('width', this.x1.bandwidth())
      .attr('x', (d) => this.x1(d.key))
      .attr('y', (d) => this.y(d.value))
      .attr('height', (d) => this.height - this.y(d.value))
      .attr('fill', (d) => this.z(d.key));

  }
}
