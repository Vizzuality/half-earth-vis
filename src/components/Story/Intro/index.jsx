import React from 'react';
import Mouse from '../../Mouse';
import './style.scss';


class Intro extends React.Component{

  render() {
    return (
      <div className="c-intro">
        <h1>
          We  live<br />
          in a<br />
          disappearing<br />
          world<br />
        </h1>
        <Mouse />
      </div>
    );
  }

}

export default Intro;
