import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class ThirdSection extends React.Component{

  render() {
    return (
      <div className="c-third-section wrap">
        <div className="text-section">
          <p>Half-Earth is a call-to-action to commit</p>
          <p>half of the planet’s surface to nature.</p>
          <TitleSection text="Why one half?" align="center" />
        </div>
      </div>
    );
  }

}

export default ThirdSection ;
