import React from 'react';
import videoPath from './assets/demo.mp4';
import './style.scss';


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
      document.querySelector('body').classList.add('-stop-scrolling');
      window.scrollTo(0, state.minY);
      setTimeout(function(){
        document.querySelector('.vizz-component-globe').classList.remove('to-bottom');
        document.querySelector('.vizz-component-globe').classList.add('to-top');
        document.querySelector('.back-stars').style.display = 'block';
      }, (22100));
      setTimeout(function(){
        document.querySelector('.first-text-globe').style.opacity = '1';
      }, (23500));
      setTimeout(function(){
        document.querySelector('.first-text-globe').style.opacity = '0';
      }, (24900));
      setTimeout(function(){
        document.querySelector('.first-text-globe').style.display = 'none';
      }, (25900));
      setTimeout(function(){
        document.querySelector('.second-text-globe').style.opacity = '1';
      }, (27300));
      setTimeout(function(){
        document.querySelector('.second-text-globe').style.opacity = '0';
      }, (28300));
      setTimeout(function(){
        document.querySelector('.second-text-globe').style.display = 'none';
        document.querySelector('.contain-checks').style.opacity = '1';
      }, (28400));
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
          {/* <source src="https://drive.google.com/uc?export=download&id=0B1__or7KNt_LNjJzMktzOUU0NU0" type="video/mp4"></source> */}
          <source src={videoPath} type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

VideoSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default VideoSection;
