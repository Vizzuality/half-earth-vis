import React from 'react';
import './style.scss';


class Circles extends React.Component {

  render() {
    return (
      <div className="c-circles">
        <div className="animate-pulse">{''}</div>
        <div className="animate-pulse-second">{''}</div>
        <div className="animate-pulse-third">{''}</div>
      </div>
    );
  }

}

export default Circles;
