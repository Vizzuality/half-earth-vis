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
    const width = Math.ceil(window.innerHeight * 1) + 100;
    const height = Math.ceil(window.innerHeight * 1) + 100;
    const radius = width;

    const svg = d3.select('.c-ranger-d3')
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
      .endAngle(40 * ((Math.PI) / 180));

    svg.append('path')
      .attr('stroke-width', '22px')
      .attr('stroke-linejoin', 'round')
      .attr('d', arc)
      .attr('stroke', '#06d5ff')
      .attr('class', 'outer-arc');

    svg.append('path')
        .attr('stroke-width', '12px')
        .attr('stroke-linejoin', 'round')
        .attr('d', arc2)
        .attr('stroke', '#06d5ff')
        .attr('class', 'inner-arc');

    svg.append('circle')
      .attr('r', 8)
      .attr('cx', 0)
      .attr("cy", -((radius/4) + 50))
      .style('fill', '#FFF');

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
  }

  render() {
    return (
      <div className="c-ranger-d3">

      </div>
    );
  }

}

export default RangerD3;
