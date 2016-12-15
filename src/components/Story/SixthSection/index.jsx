import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class SixthSection extends React.Component{

  render() {
    return (
      <div className="c-sixth-section wrap">
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

export default SixthSection ;
