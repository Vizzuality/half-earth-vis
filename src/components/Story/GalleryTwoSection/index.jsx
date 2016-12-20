import React from 'react';
import './style.scss';
import firstImage from './assets/scouts.jpg';
import secondImage from './assets/eowilson.jpg';
import fifthImage from './assets/bird.jpg';
import sixthImage from './assets/helicopter.jpg';


class GalleryTwoSection extends React.Component{

  render() {
    return (
      <div className="c-gallery-two-section">
        <div className="wrap">
          <img className="first-image-two" src={firstImage} alt="Scouts" />
          <img className="second-image-two" src={secondImage} alt="EO wilson" />
          <img className="fifth-image-two" src={fifthImage} alt="Bird" />
          <img className="sixth-image-two" src={sixthImage} alt="Helicopter" />
          <div className="text-section first">
            <p>The Half-Earth Project will drive</p>
            <p>the research needed to better understand</p>
            <p>and care for our world,</p>
          </div>
          <div className="text-section second">
            <p>provide leadership</p>
            <p>to guide conservation efforts,</p>
          </div>
          <div className="text-section third">
            <p>and engage people</p>
            <p>in the transcendent goal of Half-Earth.</p>
          </div>
        </div>
        <div className="large-image">
          <div className="third-image-two">{''}</div>
        </div>
        <div className="large-image">
          <div className="fourth-image-two">{''}</div>
        </div>
      </div>
    );
  }

}

export default GalleryTwoSection ;
