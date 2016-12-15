import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';
import firstImage from './assets/road.jpg';
import secondImage from './assets/tigers.jpg';
import fourthImage from './assets/tree.jpg';
import sixthImage from './assets/mallard.jpg';


class SecondSection extends React.Component{

  render() {
    return (
      <div className="c-second-section">
        <div className="wrap">
          <img className="first-image" src={firstImage} alt="Road" />
          <img className="second-image" src={secondImage} alt="Tigers" />
          <img className="fourth-image" src={fourthImage} alt="Mountain with tree" />
          <img className="sixth-image" src={sixthImage} alt="Mallard" />
          <div className="text-section first">
            <p>Suitable habitat, crucial to nature’s survival,</p>
            <p>is shrinking fast. In fact the rate of</p>
            <p>extinction today is at least 1,000 times</p>
            <p>higher than at any time in Earth’s history.</p>
          </div>

          <div className="text-section second">
            <TitleSection text="We must acT NOW" />
            <p>Before we’ve lost irreplaceable species</p>
            <p>and ecosystems forever.</p>
          </div>
        </div>

        <div className="large-image">
          <div className="third-image">{''}</div>
        </div>

        <div className="large-image">
          <div className="fifth-image">{''}</div>
        </div>
      </div>
    );
  }

}

export default SecondSection;
