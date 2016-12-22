import React from 'react';
import './style.scss';


class Circles extends React.Component {

  render() {
    const activeClassName = this.props.active ? '' : ' -hidden';
    return (
      <div className="c-circles">
        <div className="animatePulse"></div>
        <div className="animatePulseSecond"></div>
        <div className="animatePulseThird"></div>
      </div>
    );
  }

}

export default Circles;
