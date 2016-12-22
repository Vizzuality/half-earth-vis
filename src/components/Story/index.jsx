import React from 'react';
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
import objectFitVideos from '../../lib/object-fit-videos';

import './style.scss';

class Story extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop,
      direction: props.direction
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        scrollTop: nextProps.scrollTop,
        direction: nextProps.direction
      }
    );
  }

  // componentDidMount() {

  //   objectFitVideos();

  //   let lastScrollTop = window.pageYOffset;
  //   let up = 0;
  //   let down = 0;

  //   window.addEventListener('scroll', () => {
  //     this.setState({ scrollTop: window.pageYOffset });

  //     if (window.pageYOffset <= 391) {
  //       if ($('.c-scroll-animation').hasClass('-half-hidden') === true) {
  //         $('.c-scroll-animation').removeClass('-half-hidden');
  //       }
  //     }

  //     if (window.pageYOffset >= 392 && window.pageYOffset <= 650) {
  //       if ($('.c-scroll-animation').hasClass('-hidden') === true) {
  //         $('.c-scroll-animation').removeClass('-hidden');
  //       }
  //       $('.c-scroll-animation').addClass('-half-hidden');
  //     }

  //     if (window.pageYOffset >= 651) {
  //       if ($('.c-scroll-animation').hasClass('-half-hidden') === true) {
  //         $('.c-scroll-animation').removeClass('-half-hidden');
  //       }
  //       $('.c-scroll-animation').addClass('-hidden');
  //     }

  //     const st = window.pageYOffset;

  //     // Gallery One Animation
  //     if (window.pageYOffset > 1470 && window.pageYOffset < 2220) {
  //       const firstTop = parseFloat($('.first-image-one').css('top'));
  //       const secondTop = parseFloat($('.second-image-one').css('top'));
  //       const thirdTop = parseFloat($('.third-image-one').css('top'));
  //       const fourthTop = parseFloat($('.fourth-image-one').css('top'));
  //       const fifthTop = parseFloat($('.fifth-image-one').css('top'));
  //       const sixthTop = parseFloat($('.sixth-image-one').css('top'));

  //       if (st > lastScrollTop) {
  //         up = 0; // up now is stop = 0
  //         down += 1; // start down scroll

  //         $('.first-image-one').css('top', `${firstTop + (down * 0.015)}px`);
  //         $('.second-image-one').css('top', `${secondTop - (down * 0.025)}px`);
  //         $('.third-image-one').css('top', `${thirdTop + (down * 0.035)}px`);
  //         $('.fourth-image-one').css('top', `${fourthTop - (down * 0.015)}px`);
  //         $('.fifth-image-one').css('top', `${fifthTop + (down * 0.025)}px`);
  //         $('.sixth-image-one').css('top', `${sixthTop - (down * 0.015)}px`);
  //       } else {
  //         down = 0;
  //         up += 1;

  //         $('.first-image-one').css('top', `${firstTop - (up * 0.015)}px`);
  //         $('.second-image-one').css('top', `${secondTop + (up * 0.025)}px`);
  //         $('.third-image-one').css('top', `${thirdTop - (up * 0.035)}px`);
  //         $('.fourth-image-one').css('top', `${fourthTop + (up * 0.015)}px`);
  //         $('.fifth-image-one').css('top', `${fifthTop - (up * 0.025)}px`);
  //         $('.sixth-image-one').css('top', `${sixthTop + (up * 0.015)}px`);
  //       }
  //     }

  //     // Gallery Two Animation
  //     if (window.pageYOffset > 4080 && window.pageYOffset < 5380) {
  //       const firstTop = parseFloat($('.first-image-two').css('top'));
  //       const secondTop = parseFloat($('.second-image-two').css('top'));
  //       const thirdTop = parseFloat($('.third-image-two').css('top'));
  //       const fourthTop = parseFloat($('.fourth-image-two').css('top'));
  //       const fifthTop = parseFloat($('.fifth-image-two').css('top'));
  //       const sixthTop = parseFloat($('.sixth-image-two').css('top'));

  //       if (st > lastScrollTop) {
  //         up = 0; // up now is stop = 0
  //         down += 1; // start down scroll

  //         $('.first-image-two').css('top', `${firstTop + (down * 0.015)}px`);
  //         $('.second-image-two').css('top', `${secondTop - (down * 0.025)}px`);
  //         $('.third-image-two').css('top', `${thirdTop + (down * 0.035)}px`);
  //         $('.fourth-image-two').css('top', `${fourthTop - (down * 0.015)}px`);
  //         $('.fifth-image-two').css('top', `${fifthTop + (down * 0.025)}px`);
  //         $('.sixth-image-two').css('top', `${sixthTop - (down * 0.015)}px`);
  //       } else {
  //         down = 0;
  //         up += 1;

  //         $('.first-image-two').css('top', `${firstTop - (up * 0.015)}px`);
  //         $('.second-image-two').css('top', `${secondTop + (up * 0.025)}px`);
  //         $('.third-image-two').css('top', `${thirdTop - (up * 0.035)}px`);
  //         $('.fourth-image-two').css('top', `${fourthTop + (up * 0.015)}px`);
  //         $('.fifth-image-two').css('top', `${fifthTop - (up * 0.025)}px`);
  //         $('.sixth-image-two').css('top', `${sixthTop + (up * 0.015)}px`);
  //       }
  //     }

  //     lastScrollTop = st;

  //     // Video Player function
  //     if (window.pageYOffset > 6800 && window.pageYOffset < 7100) {
  //       $('.video-player')[0].play();
  //     } else {
  //       $('.video-player')[0].pause();
  //     }
  //   });
  // }

  render() {
    return (
      <div className="c-story">
        <CoverStorySection scrollTop={this.state.scrollTop} />
        <MeshSection />
        <GalleryOneSection scrollTop={this.state.scrollTop} direction={this.state.direction} />
        <RangeSection />
        <RangeHalfSection />
        <GalleryTwoSection scrollTop={this.state.scrollTop} direction={this.state.direction} />
        <CirclesSection />
        <VideoSection scrollTop={this.state.scrollTop} />
        <EighthSection />
        <InteractiveWorld />
      </div>
    );
  }

}

export default Story;
