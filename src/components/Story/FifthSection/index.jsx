import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';
import firstImage from './assets/scouts.jpg';
import secondImage from './assets/eowilson.jpg';
import fifthImage from './assets/bird.jpg';
import sixthImage from './assets/helicopter.jpg';


class FifthSection extends React.Component{

  render() {
    return (
      <div className="c-fifth-section">
        <div className="wrap">
          <img className="first-image" src={firstImage} alt="Road" />
          <img className="second-image" src={secondImage} alt="Road" />
          <img className="fifth-image" src={fifthImage} alt="Road" />
          <img className="sixth-image" src={sixthImage} alt="Road" />
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
          <div className="third-image">{''}</div>
        </div>
        <div className="large-image">
          <div className="fourth-image">{''}</div>
        </div>
      </div>
    );
  }

}

export default FifthSection ;
