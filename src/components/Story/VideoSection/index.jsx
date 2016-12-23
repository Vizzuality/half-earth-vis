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
    const state = {
      minY: this.video.offsetTop,
      maxY: this.video.offsetTop + window.innerHeight,
      video: this.videoplayer
    };

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    isVideoPlay ? this.videoplayer.play() : this.videoplayer.pause();
    isVideoPlay ? containBackground.style.background = 'transparent' : null;
    isVideoPlay ? containCirclesLines.style.opacity = '0' : null;

    if (this.props.scrollTop > (state.maxY + half)) {
      containBackground.style.background = 'transparent';
      containCirclesLines.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-video-section" ref={(c) => { this.video = c; }}>
        <video className="video-player" ref={(c) => { this.videoplayer = c; }} autoPlay loop>
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
