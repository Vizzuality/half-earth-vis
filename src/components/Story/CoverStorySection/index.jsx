import React from 'react';
import Mouse from '../../Mouse';
import './style.scss';


class CoverStorySection extends React.Component{

  render() {
    return (
      <div className="c-cover">
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

export default CoverStorySection;
