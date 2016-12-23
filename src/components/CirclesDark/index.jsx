import React from 'react';
import './style.scss';


class CirclesDark extends React.Component {

  render() {
    const activeClassName = this.props.active ? '' : ' -hidden';
    return (
      <div className="c-circles-dark z1">
        <div className="animatePulse"></div>
        <div className="animatePulseSecond"></div>
        <div className="animatePulseThird"></div>
        <div className="animatePulseFourth"></div>
      </div>
    );
  }

}

export default CirclesDark;
