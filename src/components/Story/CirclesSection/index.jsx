import React from 'react';

import eowilson from './assets/EOWilson.png';
import dlia from './assets/DLiA.png';
import esf from './assets/ESF.png';
import luchoffman from './assets/LucHoffmanInstitute.png';
import vizzuality from './assets/vizzuality.png';
import turner from './assets/TESF.png';
import museum from './assets/_msi_logo_primary_h.png';
import parquenacional from './assets/parquenacional.png';
import tompkins from './assets/TompkinsConservation.png';

import TitleSection from '../TitleSection';
import './style.scss';


class CirclesSection extends React.Component{

  render() {
    return (
      <div className="c-circles-section wrap z2">
        <div className="include-partners wrap">
          <div className="images">
            <img src={eowilson}></img>
            <img src={dlia}></img>
            <img src={esf}></img>
            <img src={luchoffman}></img>
            <img src={vizzuality}></img>
            <img src={turner}></img>
            <img src={museum}></img>
            <img src={parquenacional}></img>
            <img src={tompkins}></img>
          </div>
        </div>
        <div className="text-section">
          <TitleSection text="Mapping Core" />
          <p>At the center of these efforts will be the</p>
          <p>Mapping Core. A platform that will answer</p>
          <p>two fundamental questions: what parts of</p>
          <p>the planet are protected now, and where</p>
          <p>should be protected in the future?</p>
        </div>
      </div>
    );
  }

}

export default CirclesSection;
