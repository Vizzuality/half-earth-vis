import React from 'react';
import './style.scss';


class EighthSection extends React.Component{

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
    const state = {
      minY: this.eight.offsetTop,
      maxY: this.eight.offsetTop
    };

    const mesh = document.querySelector('.c-mesh');
    const ranger = document.querySelector('.c-ranger-d3');
    const halfranger = document.querySelector('.c-ranger-half-d3');
    const circles = document.querySelector('.c-line-circles');
    const containCirclesLines = document.querySelector('.c-line-circles');
    const containCirclesDark = document.querySelector('.c-circles-dark');
    const isInvisible = (this.props.scrollTop > state.minY);

    if (isInvisible) {
      mesh.classList.add('hidden');
      ranger.classList.add('hidden');
      halfranger.classList.add('hidden');
      circles.classList.add('hidden');
      containCirclesLines.classList.add('hidden');
      containCirclesDark.classList.add('hidden');
    } else {
      mesh.classList.remove('hidden');
      ranger.classList.remove('hidden');
      halfranger.classList.remove('hidden');
      circles.classList.remove('hidden');
      containCirclesLines.classList.remove('hidden');
      containCirclesDark.classList.remove('hidden');
    }
  }


  render() {
    return (
      <div className="c-eighth-section z3" ref={(c) => { this.eight = c; }}>
        <h1>
          Can we save half<br />
          the earth<br />
          for the rest<br />
          of life?<br />
        </h1>
      </div>
    );
  }

}

EighthSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default EighthSection;
