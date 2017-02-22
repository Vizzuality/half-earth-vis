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

import unep from './assets/UNEP_World_Conservation_Monitoring_Centre_logo.svg.png';
import natureserve from './assets/NatureServe.png';
import iucn from './assets/IUCN_logo.svg.png';
import birdlife from './assets/BirdLife_International_logo.png';
import gbif from './assets/GBIF-logo.png';
import maplife from './assets/Map-of-life.png';
import naturalm from './assets/NaturalHistoryMuseum_London.png';
import cci from './assets/CCI.png';
import conservation from './assets/ConservationInternational.png';

import island from './assets/island-conservation.png';
import tnc from './assets/TNC.png';
import wcs from './assets/WCS.png';


import TitleSection from '../TitleSection';
import './style.scss';


class CirclesSection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  render() {
    return (
      <div className="c-circles-section wrap z2" ref={(c) => { this.circlesSection = c; }}>
        <div className="include-partners wrap" ref={(c) => { this.partnerLogo = c; }}>
          <div className="images">
            <img src={eowilson} alt="eo wilson">{}</img>
            <img src={dlia} alt="dlia">{}</img>
            <img src={esf} alt="esf">{}</img>
            <img src={luchoffman} alt="luc hoffmann institute">{}</img>
            <img src={vizzuality} alt="vizzuality">{}</img>
            <img src={turner} alt="turner endangered">{}</img>
            <img src={museum} alt="museum of science industry">{}</img>
            <img src={parquenacional} alt="parque nacional">{}</img>
            <img src={tompkins} alt="tompkins">{}</img>
          </div>
        </div>
        <div className="text-section">
          <TitleSection text="Mapping Core" />
          <p>At the center of these efforts will be the</p>
          <p>Mapping Core. A platform that will answer</p>
          <p>two fundamental questions: what parts of</p>
          <p>the planet are protected now, and where</p>
          <p>should be protected in the future{'?'}</p>
        </div>
        <div className="include-mapping wrap" ref={(c) => { this.includeLogo = c; }}>
          <div className="images">
            <img alt="unep" src={unep}>{}</img>
            <img alt="nature serve" src={natureserve}>{}</img>
            <img alt="iucn" src={iucn}>{}</img>
            <img alt="bird life" src={birdlife}>{}</img>
            <img alt="gbif" src={gbif}>{}</img>
            <img alt="map life" src={maplife}>{}</img>
          </div>
          <div className="images">
            <img alt="natural" src={naturalm}>{}</img>
            <img alt="cci" src={cci}>{}</img>
            <img alt="conservation" src={island}>{}</img>
            <img alt="conservation" src={conservation}>{}</img>
            <img alt="conservation" src={tnc}>{}</img>
            <img alt="conservation" src={wcs}>{}</img>
          </div>
        </div>
      </div>
    );
  }

}

CirclesSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default CirclesSection;
