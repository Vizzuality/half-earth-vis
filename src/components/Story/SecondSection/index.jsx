import React from 'react';
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
          <img className="second-image" src={secondImage} alt="Road" />
          <img className="fourth-image" src={fourthImage} alt="Road" />
          <img className="sixth-image" src={sixthImage} alt="Road" />
        </div>
        <div className="large-image">
          <div className="third-image" alt="Road">{''}</div>
        </div>

        <div className="large-image">
          <div className="fifth-image" alt="Road">{''}</div>
        </div>
      </div>
    );
  }

}

export default SecondSection;
