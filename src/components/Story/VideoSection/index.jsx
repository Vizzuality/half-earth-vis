import React from 'react';
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
    const containCirclesLines = document.querySelector('.c-line-circles');
    const containCirclesDark = document.querySelector('.c-circles-dark');
    const containBackBlueTwo = document.querySelector('.back-blue-two');
    const state = {
      minY: this.video.offsetTop,
      maxY: this.video.offsetTop + window.innerHeight,
      video: this.videoplayer
    };

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    if (isVideoPlay === true) {
      this.videoplayer.play();
      containBackground.style.background = 'transparent';
      containCirclesLines.style.opacity = '0';
      containCirclesDark.style.opacity = '0';
      containBackBlueTwo.style.opacity = '0';
    } else {
      this.videoplayer.pause();
    }

    if (this.props.scrollTop > (state.maxY + half)) {
      containCirclesLines.style.opacity = '0';
      containCirclesDark.style.opacity = '0';
      containBackBlueTwo.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-video-section z3" ref={(c) => { this.video = c; }}>
        <video className="video-player z3" ref={(c) => { this.videoplayer = c; }} autoPlay loop>
          {/* <source src="https://drive.google.com/uc?export=download&id=0B1__or7KNt_LNjJzMktzOUU0NU0" type="video/mp4"></source> */}
          <source src="src/components/Story/VideoSection/assets/demo.mp4" type="video/mp4"></source>
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
