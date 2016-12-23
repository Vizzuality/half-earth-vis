import React from 'react';
import './style.scss';


class BackgroundChange extends React.Component {

  render() {
    const activeClassName = this.props.active ? '' : ' -hidden';
    return (
      <div className="c-background-change">
        <div className="back-transparent"></div>
        <div className="back-blueOne"></div>
        <div className="back-blueTwo"></div>
      </div>
    );
  }

}

export default BackgroundChange ;
