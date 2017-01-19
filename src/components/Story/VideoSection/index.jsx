import React from 'react';
import stars from '../../../images/bg-stars-large.jpg';
import videoPath from './assets/demo.mp4';
import './style.scss';

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };


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

  openWorld(e) {
    document.querySelector('.vizz-component-globe').classList.add('back');
    document.querySelector('.vizz-component-globe').style.top = '50%';
  }

  checkPlayVideo() {
    const containBackground = document.querySelector('.c-background-change');
    const containBackBlueTwo = document.querySelector('.back-blue-two');
    const state = {
      minY: this.video.offsetTop,
      maxY: this.video.offsetTop + window.innerHeight,
      video: this.videoplayer
    };


    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      document.querySelector('.vizz-component-globe').style.top = '150%';
      document.querySelector('.vizz-component-globe').classList.add('max-z');
    }

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

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
        <div className="button" onClick={(e) => this.openWorld(e)}>
        </div>
      </div>
    );
  }
}

VideoSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default VideoSection;
