import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DisplayComponent } from "../dynamic-display/IDisplayComponent";
import { MultiPeriodChart } from "../DataBuilders";
@Component({
    selector: 'app-waterfall-chart',
    templateUrl: './waterfall-chart.component.html',
    styleUrls: ['./waterfall-chart.component.css']
})

export class WaterfallChartComponent extends DisplayComponent<MultiPeriodChart> implements OnInit {
    private width: number;
    private height: number;
    private margin = { top: 20, right: 20, bottom: 30, left: 40 };
    private padding: 0.3;
    private svg: any;
    private g: any;
    private x: any;
    private y: any;
    private source;
    private data = [];

    constructor() {
        super();
    }

    protected loadData(): void {
        if (this.Source) {
            this.source = this.Source.getData();
        }
    }


    ngOnInit() {
        this.loadData();
        if (this.source) {
            let cumulative = 0;
            this.source.forEach((val) => {
                this.data.push({
                    name: val.x,
                    start: cumulative,
                    end: cumulative + val.y,
                    class: val.y >= 0 ? 'positive' : 'negative'
                });
                cumulative = cumulative + val.y;
            });
            this.data.push({
                name: 'Total',
                start: 0,
                end: cumulative,
                class: 'total'
            });
            this.initSvg();
            this.initAxis();
            this.drawAxis();
            this.drawBar();
        }

    }

    private initSvg() {
        this.svg = d3.select('#waterfallchart > svg');
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        d3.selectAll('#waterfallchart>svg').attr('width', '100%');
        this.x = d3Scale.scaleBand().range([0, this.width]).padding(0.3);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(this.data.map((d) => d.name));
        this.y.domain([0, d3Array.max(this.data, (d) => d.end)]);
    }

    private drawAxis() {
        this.g.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));
        this.g.append('g')
            .attr('class', 'y axis')
            .call(d3Axis.axisLeft(this.y).tickFormat((d) => { return d / 1000; }));
    }

    private drawBar() {
        const bar = this.svg.selectAll('.bar')
            .data(this.data)
            .enter().append('g')
            .attr('class', (d) => 'bar ' + d.class)
            .attr('transform', (d) => 'translate(' + (this.x(d.name) + 30) + ',0)');

        bar.append('rect')
            .attr('y', (d) => this.y(Math.max(d.start, d.end)))
            .attr('height', (d) => Math.abs(this.y(d.start) - this.y(d.end)))
            .attr('width', this.x.bandwidth());

        bar.append('text')
            .attr('x', this.x.bandwidth() / 2)
            .attr('y', (d) => this.y(d.end) + 5)
            .attr('dy', (d) => ((d.class === 'negative') ? '-' : '') + '.75em')
            .text((d) => d.end - d.start);

        bar.filter((d) => d.class !== 'total').append('line')
            .attr('class', 'connector')
            .attr('x1', this.x.bandwidth() + 5)
            .attr('y1', (d) => this.y(d.end))
            .attr('x2', this.x.bandwidth() / (1 - 0.3) - 5)
            .attr('y2', (d) => this.y(d.end));
    }
}
