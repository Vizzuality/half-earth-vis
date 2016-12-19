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
    // Gallery One Animation
    let lastScrollTop = window.pageYOffset;
    let up = 0;
    let down = 0;
    window.addEventListener('scroll', () => {
      this.setState({ scrollTop: window.pageYOffset });
      const st = window.pageYOffset;

      if (window.pageYOffset > 1470 && window.pageYOffset < 2220) {
        const firstTop = parseFloat($('.first-image').css('top'));
        const secondTop = parseFloat($('.second-image').css('top'));
        const thirdTop = parseFloat($('.third-image').css('top'));
        const fourthTop = parseFloat($('.fourth-image').css('top'));
        const fifthTop = parseFloat($('.fifth-image').css('top'));
        const sixthTop = parseFloat($('.sixth-image').css('top'));

        if (st > lastScrollTop) {
          up = 0; // up now is stop = 0
          down += 1; // start down scroll

          $('.first-image').css('top', `${firstTop + (down * 0.1)}px`);
          $('.second-image').css('top', `${secondTop - (down * 0.2)}px`);
          $('.third-image').css('top', `${thirdTop + (down * 0.3)}px`);
          $('.fourth-image').css('top', `${fourthTop - (down * 0.1)}px`);
          $('.fifth-image').css('top', `${fifthTop + (down * 0.2)}px`);
          $('.sixth-image').css('top', `${sixthTop - (down * 0.1)}px`);
        } else {
          down = 0;
          up += 1;

          $('.first-image').css('top', `${firstTop - (up * 0.1)}px`);
          $('.second-image').css('top', `${secondTop + (up * 0.2)}px`);
          $('.third-image').css('top', `${thirdTop - (up * 0.3)}px`);
          $('.fourth-image').css('top', `${fourthTop + (up * 0.1)}px`);
          $('.fifth-image').css('top', `${fifthTop - (up * 0.2)}px`);
          $('.sixth-image').css('top', `${sixthTop + (up * 0.1)}px`);
        }
      }

      lastScrollTop = st;

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
