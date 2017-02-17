import React from 'react';
import './style.scss';


class RangeHalfSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  componentDidMount() {
    this.showRange();
  }

  componentDidUpdate() {
    this.showRange();
  }

  showRange() {
    const circles = [
      { el: document.querySelector('.animate-pulse'), velocity: 2.4 },
      { el: document.querySelector('.animate-pulse-second'), velocity: 2 },
      { el: document.querySelector('.animate-pulse-third'), velocity: 1.6 },
    ];

    const containRange = document.querySelector('.c-ranger-d3');
    const containBackTransparent = document.querySelector('.back-transparent');
    const containBackBlueOne = document.querySelector('.back-blue-one');
    const containBackBlueTwo = document.querySelector('.back-blue-two');

    const height = this.range.offsetHeight;
    // const containRange = document.querySelector('.c-ranger-half-d3');
    const containCircles = document.querySelector('.c-circles');
    const state = {
      minY: this.range.offsetTop,
      maxY: this.range.offsetTop + 300
    };

    const isRange = (this.props.scrollTop > (state.minY)
    && this.props.scrollTop < (state.maxY));

    const isRangeCircles = (this.props.scrollTop > (state.minY - (height / 3))
    && this.props.scrollTop < (state.maxY + (height / 3)));

    const minY = state.minY - (height / 3);
    const maxY = state.maxY + (height / 3);
    const total = maxY - minY;
    const circleAnimation = ((this.props.scrollTop - minY) / total);
    let circleAnimationOpacity = circleAnimation * 0.5;
    circleAnimationOpacity <= 0.1 ? null : circleAnimationOpacity = 0.1;

    if (isRange) {
      containBackTransparent.style.opacity = '0';
      containBackBlueTwo.style.opacity = '0';
      containBackBlueOne.style.opacity = '1';
    }

    if (this.props.scrollTop < (state.minY - (height / 3))) {
      containBackBlueOne.style.opacity = '0';
      containBackTransparent.style.opacity = '1';
    }

    if (this.props.scrollTop > (state.maxY + (height / 3))) {
      containBackBlueOne.style.opacity = '0';
      containBackBlueTwo.style.opacity = '1';
    }

    if (isRangeCircles) {
      containCircles.style.opacity = '1';
      for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].el.style.opacity = `${circleAnimationOpacity}`;
        circles[i].el.style.transform = `scale(${circleAnimation * circles[i].velocity})`;
      }
    } else {
      for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].el.style.transform = 'scale(0)';
      }
      containCircles.style.opacity = '0';
    }

    if (this.props.scrollTop > (state.maxY + (height / 2))) {
      containRange.style.opacity = '0';
    }
  }


  render() {
    return (
      <div className="c-range-half-section wrap z3" ref={(c) => { this.range = c; }}>
        <div className="text-section">
          <p>If we conserve half the land and sea, 85% of</p>
          <p>all species will be protected from extinction</p>
          <p>and life on Earth enters the safe zone.</p>
        </div>
      </div>
    );
  }

}

RangeHalfSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default RangeHalfSection ;
