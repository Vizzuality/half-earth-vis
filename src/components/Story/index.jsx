import React from 'react';
import $ from 'jquery';

import Intro from './Intro';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection'; // first gallery
import ThirdSection from './ThirdSection';
import FourthSection from './FourthSection';
import FifthSection from './FifthSection';

import './style.scss';

const defaults = {};

class Story extends React.Component{

// constructor(queryElement, options = {}) {
//   this.el = document.querySelector(queryElement);
//   this.options = Object.assign({}, defaults, options);
//   this.init();
// }
//
// init() {
//   this.$el = $(this.el);
// }

  render() {
    return (
      <div>
        <Intro />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
      </div>
    );
  }

}

export default Story;
