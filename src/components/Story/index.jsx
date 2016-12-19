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

class Story extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.setState({ scrollTop: window.pageYOffset });

      // Video Player function
      if (window.pageYOffset > 6800 && window.pageYOffset < 7100) {
        $('.video-player')[0].play();
      } else {
        $('.video-player')[0].pause();
      }
    });
  }

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
