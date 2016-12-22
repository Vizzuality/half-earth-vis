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
    const height = this.range.offsetHeight;
    const containRange = document.querySelector('.c-ranger-half-d3');
    const state = {
      minY: this.range.offsetTop,
      maxY: this.range.offsetTop + 300
    };

    const isRange = (this.props.scrollTop > (state.minY)
    && this.props.scrollTop < (state.maxY));

    if (isRange) {
      containRange.style.opacity = '1';
    } else {
      containRange.style.opacity = '0';
    }
  }


  render() {
    return (
      <div className="c-range-half-section wrap z2" ref={(c) => { this.range = c; }}>
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
