import React from 'react';
import $ from 'jquery';

import CoverStorySection from './CoverStorySection';
import MeshSection from './MeshSection';
import GalleryOneSection from './GalleryOneSection'; // first gallery
import RangeSection from './RangeSection';
import RangeHalfSection from './RangeHalfSection';
import GalleryTwoSection from './GalleryTwoSection';
import CirclesSection from './CirclesSection';
import VideoSection from './VideoSection';
import EighthSection from './EighthSection';
import InteractiveWorld from './InteractiveWorld';

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
        <CoverStorySection />
        <MeshSection />
        <GalleryOneSection />
        <RangeSection />
        <RangeHalfSection />
        <GalleryTwoSection />
        <CirclesSection />
        <VideoSection />
        <EighthSection />
        <InteractiveWorld />
      </div>
    );
  }

}

export default Story;
