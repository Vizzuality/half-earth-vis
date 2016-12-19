import React from 'react';
import RangeSVG from './RangeSVG';
import TitleSection from '../TitleSection';
import './style.scss';


class RangeSection extends React.Component{

  render() {
    return (
      <div className="c-range-section wrap">
        <div className="text-section">
          <RangeSVG />
          <p>Half-Earth is a call-to-action to commit</p>
          <p>half of the planet’s surface to nature.</p>
          <TitleSection text="Why one half?" align="center" />
        </div>
      </div>
    );
  }

}

export default RangeSection ;
