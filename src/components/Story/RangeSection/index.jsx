import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class RangeSection extends React.Component{

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
    const containRange = document.querySelector('.c-ranger-d3');
    const state = {
      minY: this.range.offsetTop,
      maxY: this.range.offsetTop + 280
    };

    const isRange = (this.props.scrollTop > (state.minY - 100)
    && this.props.scrollTop < (state.maxY));

    if (isRange) {
      containRange.style.opacity = '1';
    } else {
      containRange.style.opacity = '0';
    }
  }


  render() {
    return (
      <div className="c-range-section wrap z2" ref={(c) => { this.range = c; }}>
        <div className="text-section">
          <p>Half-Earth is a call-to-action to commit</p>
          <p>half of the planet’s surface to nature.</p>
          <TitleSection text="Why one half?" align="center" />
        </div>
      </div>
    );
  }

}

RangeSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default RangeSection ;
