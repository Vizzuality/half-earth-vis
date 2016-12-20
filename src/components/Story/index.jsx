import React from 'react';
import $ from 'jquery';

import Intro from './Intro';

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
      </div>
    );
  }

}

export default Story;
