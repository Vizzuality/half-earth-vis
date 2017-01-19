import React from 'react';
import './style.scss';


class Mouse extends React.Component {

  render() {
    const activeClassName = this.props.active ? '' : ' -hidden';
    return (
      <div className="c-scroll-animation" ref={(c) => { this.mouse = c; }}>
        <div className="mouse">
        <div className="wheel"></div>
        </div>
        <div>
          <span className="arrow -one"></span>
          <span className="arrow -two"></span>
        </div>
        <div className="footnote">scroll down to find out more</div>
      </div>
    );
  }

}

export default Mouse;
