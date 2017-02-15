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
  }

  componentDidUpdate() {
    this.checkPlayVideo();
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
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    if (window.scrollY >= state.minY) {
      document.querySelector('body').classList.add('-stop-scrolling');
      window.scrollTo(0, state.minY);
      setTimeout(function(){
        document.querySelector('.c-interactive-world-section').style.top = '-200vh';
        document.querySelector('.c-interactive-world-section').classList.add('z4');
      }, (/* this.videoplayer.duration * */1000));
    } else {
      document.querySelector('body').classList.remove('-stop-scrolling');
      document.querySelector('.c-interactive-world-section').style.top = '0';
      document.querySelector('.c-interactive-world-section').classList.remove('z4');
    }

    if (isVideoPlay === true) {
      this.videoplayer.play();
      containBackground.style.background = 'transparent';
      containBackBlueTwo.style.opacity = '0';
    } else {
      this.videoplayer.pause();
      this.videoplayer.currentTime = 0;
    }

    if (this.props.scrollTop > (state.maxY + half)) {
      containBackBlueTwo.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-video-section z3" ref={(c) => { this.video = c; }}>
        <video className="video-player z3" ref={(c) => { this.videoplayer = c; }} autoPlay loop>
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
