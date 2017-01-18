import * as d3 from 'd3';
import React from 'react';
import './style.scss';

class RangerD3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
      animation: 'no'
    };
  }

  componentDidMount() {
    this.createRangeD3();
  }

  componentDidUpdate() {

  }

  createRangeD3() {
    const width = this.props.width + 300;
    const height = this.props.height + 300;
    const radius = width;
    const values = [
      {
        startAngle: 0,
        endAngle: 140 * ((Math.PI) / 180)
      }
    ];

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
      .startAngle(0);


    svg.append('path')
        .attr('stroke-width', '22px')
        .attr('stroke-linejoin', 'round')
        .attr('d', arc)
        .attr('stroke', '#06d5ff')
        .attr('class', 'outer-arc')
        .attr('transform', 'rotate(220)');

    const animation = svg.selectAll('path.arc2')
        .data(values)
        .enter()
        .append('path')
        .attr('stroke-width', '12px')
        .attr('stroke-linejoin', 'round')
        .attr('d', arc2)
        .attr('stroke', '#06d5ff')
        .attr('class', 'inner-arc')
        .attr('transform', 'rotate(-140)');

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
       .attr('x', 0)
       .attr('y', -((radius / 4) + 70))
       .attr('rx', 8)
       .attr('ry', 8)
       .attr('width', 16)
       .attr('height', 40)
       .style('fill', '#FFF');

    function animateArc() {
      animation.transition().duration(10500)
       .attrTween('d', function (d) {
         const start = { startAngle: 0, endAngle: (40 * ((Math.PI) / 180)) };
         const interpolate = d3.interpolate(start, d);
         return function (t) {
           return arc2(interpolate(t));
         };
       });
    }

    animateArc();
  }


  render() {
    return (
      <div className="c-ranger-d3">
        {''}
      </div>
    );
  }

}

RangerD3.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default RangerD3;
