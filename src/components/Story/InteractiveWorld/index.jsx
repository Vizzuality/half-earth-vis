import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class InteractiveWorld extends React.Component{

  render() {
    return (
      <div className="c-interactive-world-section wrap z2">
        <TitleSection text="We can if we want to" align="center" />
      </div>
    );
  }

}

export default InteractiveWorld;
