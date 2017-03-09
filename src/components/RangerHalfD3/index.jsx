import * as d3 from 'd3';
import React from 'react';
import './style.scss';

let animationArc = false;
let animationArcDo = false;

class RangerD3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
      animation: false
    };
  }

  componentDidMount() {
    this.createRangeD3();
  }

  componentDidUpdate() {
    if(animationArc === false){
      if (this.props.scrollTop > (document.querySelector('.c-range-half-section').offsetTop - (document.querySelector('.c-range-half-section').offsetHeight / 5))) {
        animationArc = true;
        animationArcDo = true;
        this.createRangeD3();
      }
    }
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

    const arc = d3.arc()
        .innerRadius((radius / 4) + 50)
        .outerRadius((radius / 4) + 50)
        .startAngle(0)
        .endAngle(280 * ((Math.PI) / 180));

    const arc2 = d3.arc()
      .innerRadius((radius / 4) + 50)
      .outerRadius((radius / 4) + 50)
      .startAngle(0)
      .endAngle(0.8);

      const arc2Anim = d3.arc()
        .innerRadius((radius / 4) + 50)
        .outerRadius((radius / 4) + 50)
        .startAngle(0);

        if (animationArcDo === false) {

          const svg = d3.select('.c-ranger-d3')
          .append('svg:svg')
          .attr('width', width)
          .attr('height', height)
          .append('svg:g')
          .attr('transform', 'translate('+ width / 2 + ',' + height / 2 + ')');

        svg.append('path')
            .attr('stroke-width', '22px')
            .attr('stroke-linejoin', 'round')
            .attr('d', arc)
            .attr('stroke', '#06d5ff')
            .attr('class', 'outer-arc')
            .attr('transform', 'rotate(220)');

            svg.append('path')
            .attr('stroke-width', '12px')
            .attr('stroke-linejoin', 'round')
            .attr('d', arc2)
            .attr('stroke', '#06d5ff')
            .attr('class', 'inner-arc')
            .attr('transform', 'rotate(-140)');

            svg.append('text')
               .attr('text-anchor', 'middle')
               .attr('dy', -310)
               .attr('dx', 10)
               .attr('class', 'text-top')
               .text('HALF EARTH');

        svg.append('text')
           .attr('text-anchor', 'middle')
           .attr('dy', ((radius / 4) + 20))
           .attr('dx', ((+radius / 4) - 10))
           .attr('class', 'text-left')
           .text('NOT PROTECTED.');

        svg.append('text')
           .attr('text-anchor', 'middle')
           .attr('dy', ((radius / 4) + 20))
           .attr('dx', (-radius / 4) - 40)
           .attr('class', 'text-right')
           .text('Protected Area');

        svg.append('rect')
           .attr('x', 0)
           .attr('y', -((radius / 4) + 70))
           .attr('rx', 8)
           .attr('ry', 8)
           .attr('width', 16)
           .attr('height', 40)
           .style('fill', '#FFF');

            }

            function animateFunc() {
              const svgAnim = d3.select('.c-ranger-d3-anim')
              .append('svg:svg')
              .attr('width', width)
              .attr('height', height)
              .append('svg:g')
              .attr('transform', 'translate('+ width / 2 + ',' + height / 2 + ')');

              svgAnim.append('rect')
                 .attr('x', 0)
                 .attr('y', -((radius / 4) + 70))
                 .attr('rx', 8)
                 .attr('ry', 8)
                 .attr('width', 16)
                 .attr('height', 40)
                 .style('fill', '#FFF');

                 const animation = svgAnim.selectAll('path.arc2Anim')
                     .data(values)
                     .enter()
                     .append('path')
                     .attr('stroke-width', '12px')
                     .attr('stroke-linejoin', 'round')
                     .attr('d', arc2Anim)
                     .attr('stroke', '#06d5ff')
                     .attr('class', 'inner-arc')
                     .attr('transform', 'rotate(-140)');



                         svgAnim.append('path')
                             .attr('stroke-width', '22px')
                             .attr('stroke-linejoin', 'round')
                             .attr('d', arc)
                             .attr('stroke', '#06d5ff')
                             .attr('class', 'outer-arc')
                             .attr('transform', 'rotate(220)');

                             svgAnim.append('text')
                                .attr('text-anchor', 'middle')
                                .attr('dy', -310)
                                .attr('dx', 10)
                                .attr('class', 'text-top')
                                .text('HALF EARTH');

                         svgAnim.append('text')
                            .attr('text-anchor', 'middle')
                            .attr('dy', ((radius / 4) + 20))
                            .attr('dx', ((+radius / 4) - 10))
                            .attr('class', 'text-left')
                            .text('NOT PROTECTED.');

                            svgAnim.append('rect')
                               .attr('x', 0)
                               .attr('y', -((radius / 4) + 70))
                               .attr('rx', 8)
                               .attr('ry', 8)
                               .attr('width', 16)
                               .attr('height', 40)
                               .style('fill', '#FFF');



                         svgAnim.append('text')
                            .attr('text-anchor', 'middle')
                            .attr('dy', ((radius / 4) + 20))
                            .attr('dx', (-radius / 4) - 40)
                            .attr('class', 'text-right')
                            .text('Protected Area');

              function animateArc() {
                            animation.transition().duration(2000)
                             .attrTween('d', function (d) {
                               const start = { startAngle: 0, endAngle: (0.8) };
                               const interpolate = d3.interpolate(start, d);
                               return function (t) {
                                 return arc2Anim(interpolate(t));
                               };
                             });

              }
              animateArc();
            }

        if (animationArcDo === true) {
          animateFunc();
        }

    if (animationArc === true) {
      document.querySelector('.c-ranger-d3').style.display = 'none';
    }
  }


  render() {
    return (
      <div className="contain-ranger">

        <div className="c-ranger-d3 z2">
          {''}
        </div>
        <div className="c-ranger-d3-anim z2">
          {''}
        </div>
      </div>
    );
  }

}

RangerD3.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default RangerD3;
