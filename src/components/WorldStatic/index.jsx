import React from 'react';
import './style.scss';
import worldImage from './assets/world.png';


class WorldStatic extends React.Component{

  render() {
    return (
      <div className="c-world-static">
        <img className="first-image-one" src={worldImage} alt="Road" />
      </div>
    );
  }

}

export default WorldStatic;
