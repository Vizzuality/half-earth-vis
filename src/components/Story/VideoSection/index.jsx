import React from 'react';
import './style.scss';

let showVideo = true;

class VideoSection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
      video: ''
    };
  }

  componentDidMount() {
    this.checkPlayVideo();
    if (window.scrollY < this.video.offsetTop) {
      this.videoplayer.currentTime = 0;
      this.videoplayer.pause();
    }
    if (window.scrollY === this.video.offsetTop) {
      document.querySelector('.vizz-component-globe').classList.remove('to-bottom');
    }
  }

  componentDidUpdate() {
    if (document.querySelector('body').classList.contains('-stop-scrolling')) {

    } else {
      this.checkPlayVideo();
    }
  }

  showInteractiveWorld() {
    showVideo = false;
    this.videoplayer.pause();
    document.querySelector('.vizz-component-globe').classList.remove('to-bottom');
    document.querySelector('.vizz-component-globe').classList.add('to-top');
    document.querySelector('.back-stars').style.display = 'block';
    setTimeout(function(){
      document.querySelector('.first-text-globe').style.opacity = '1';
    }, (1400));
    setTimeout(function(){
      document.querySelector('.first-text-globe').style.opacity = '0';
    }, (2800));
    setTimeout(function(){
      document.querySelector('.first-text-globe').style.display = 'none';
    }, (3800));
    setTimeout(function(){
      document.querySelector('.second-text-globe').style.opacity = '1';
    }, (5200));
    setTimeout(function(){
      document.querySelector('.second-text-globe').style.opacity = '0';
    }, (6900));
    setTimeout(function(){
      document.querySelector('.second-text-globe').style.display = 'none';
      document.querySelector('.contain-checks').style.opacity = '1';
      document.querySelector('.explore-text').style.opacity = '1';
      document.querySelector('.footer-text').style.opacity = '1';
      document.querySelector('.c-icon-circle-up').style.opacity = '1';
    }, (8500));
  }


  checkPlayVideo() {
    const containBackground = document.querySelector('.c-background-change');
    const containBackBlueTwo = document.querySelector('.back-blue-two');
    const state = {
      minY: this.video.offsetTop,
      maxY: this.video.offsetTop + window.innerHeight,
      video: this.videoplayer
    };

    const half = (state.minY - state.maxY) / 2;
    if ((window.scrollY - 1) >= state.minY) {
      this.videoplayer.play();
      document.querySelector('.second-text-globe').style.display = 'block';
      document.querySelector('.contain-checks').style.display = 'block';
      document.querySelector('.explore-text').style.display = 'block';
      document.querySelector('.footer-text').style.display = 'block';
      document.querySelector('.c-icon-circle-up').style.display = 'block';
      document.querySelector('body').classList.add('-stop-scrolling');
      window.scrollTo(0, state.minY);
      showVideo = true;
      if (showVideo) {
      setTimeout(function(){
        if (showVideo) {
          document.querySelector('.vizz-component-globe').classList.remove('to-bottom');
          document.querySelector('.vizz-component-globe').classList.add('to-top');
          document.querySelector('.back-stars').style.display = 'block';
        }
      }, (22100));
      setTimeout(function(){
        if (showVideo) {
        document.querySelector('.first-text-globe').style.opacity = '1';
        }
      }, (23500));
      setTimeout(function(){
        if (showVideo) {
        document.querySelector('.first-text-globe').style.opacity = '0';
        }
      }, (24900));
      setTimeout(function(){
        if (showVideo) {
        document.querySelector('.first-text-globe').style.display = 'none';
        }
      }, (25900));
      setTimeout(function(){
        if (showVideo) {
        document.querySelector('.second-text-globe').style.opacity = '1';
        }
      }, (27300));
      setTimeout(function(){
        if (showVideo) {
        document.querySelector('.second-text-globe').style.opacity = '0';
      }
      }, (29000));
      setTimeout(function(){
        if (showVideo) {
        document.querySelector('.second-text-globe').style.display = 'none';
        document.querySelector('.contain-checks').style.opacity = '1';
        document.querySelector('.explore-text').style.opacity = '1';
        document.querySelector('.footer-text').style.opacity = '1';
        document.querySelector('.c-icon-circle-up').style.opacity = '1';
      }
      }, (30600));
    }
    } else {
      document.querySelector('body').classList.remove('-stop-scrolling');
      document.querySelector('.vizz-component-globe').classList.remove('to-top');
    }

    if (window.scrollY >= state.minY) {
      document.querySelector('.vizz-component-globe').classList.add('to-bottom');
      containBackground.style.background = 'transparent';
      containBackBlueTwo.style.opacity = '0';
    } else {
      this.videoplayer.currentTime = 0;
    }

    if (this.props.scrollTop > (state.maxY + half)) {
      containBackBlueTwo.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-video-section z3" ref={(c) => { this.video = c; }}>
        <video className="video-player z3" ref={(c) => { this.videoplayer = c; }}>
          <source src="./videos/half-earth-wilson-video.webm" type="video/webm"></source>
          <source src="./videos/half-earth-wilson-video.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
        <svg
          className="c-icon-circle-direction  -small"
          onClick={() => this.showInteractiveWorld()}
        >
          <use xlinkHref="#icon-down-circle">{''}</use>
        </svg>
      </div>
    );
  }
}

VideoSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default VideoSection;
