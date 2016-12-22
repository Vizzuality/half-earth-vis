import * as d3 from 'd3';
import React from 'react';
import './style.scss';


class RangerD3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  componentDidMount() {
    this.createRangeD3();
  }

  createRangeD3() {
    const width = 700 + 300;
    const height = 700 + 300;
    const radius = width;

    const svg = d3.select('.c-ranger-half-d3')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .append('svg:g')
    .attr('transform', 'translate('+ width / 2 + ',' + height / 2 + ')');

    const arc = d3.arc()
        .innerRadius((radius / 4) + 50)
        .outerRadius((radius / 4) + 50)
        .startAngle(0)
        .endAngle(280 * ((Math.PI) / 180));

    const arc2 = d3.arc()
      .innerRadius((radius / 4) + 50)
      .outerRadius((radius / 4) + 50)
      .startAngle(0)
      .endAngle(140 * ((Math.PI) / 180));

    svg.append('path')
        .attr('stroke-width', '22px')
        .attr('stroke-linejoin', 'round')
        .attr('d', arc)
        .attr('stroke', '#06d5ff')
        .attr("class", "outer-arc");

    svg.append('path')
        .attr('stroke-width', '12px')
        .attr('stroke-linejoin', 'round')
        .attr('d', arc2)
        .attr('stroke', '#06d5ff')
        .attr("class", "inner-arc");


        svg.append('text')
         .attr('text-anchor', 'middle')
         .attr('dy', ((radius / 4) + 20))
         .attr('dx', ((+radius / 4) - 20))
         .attr('class', 'text-left')
         .text('Current Pa.');

     svg.append('text')
       .attr('text-anchor', 'middle')
       .attr('dy', ((radius / 4) + 20))
       .attr('dx', (-radius / 4))
       .attr('class', 'text-right')
       .text('NOT PROTECTED.');

    svg.append('rect')
    		.attr("x", 0)
        .attr("y", -((radius/4) + 70))
        .attr("rx", 8)
        .attr("ry", 8)
      	.attr("width", 16)
        .attr("height", 40)
        .style("fill", "#FFF");

}


  render() {
    return (
      <div className="c-ranger-half-d3">

      </div>
    );
  }

}

export default RangerD3;
