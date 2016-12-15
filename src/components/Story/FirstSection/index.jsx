import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class FirstSection extends React.Component{

  render() {
    return (
      <div className="c-first-section wrap">
        <TitleSection text="Human beings are connected with all of life" align="center" />
        <div className="text-section">
          <p>We depend upon all of nature</p>
          <p>in the same way that nature</p>
          <p>depends upon us.</p>
        </div>
      </div>
    );
  }

}

export default FirstSection;