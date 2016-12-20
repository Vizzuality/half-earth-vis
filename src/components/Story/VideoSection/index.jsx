import React from 'react';
import $ from 'jquery';
import './style.scss';


class VideoSection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
    };
  }

  componentDidMount() {
    this.checkPlayVideo();
  }


  componentDidUpdate() {
    this.checkPlayVideo();
  }

  checkPlayVideo() {
    const state = {
      minY: this.video.offsetTop,
      maxY: this.video.offsetTop + window.innerHeight,
    };

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    isVideoPlay ? this.videoplayer.play() : this.videoplayer.pause();
  }

  render() {
    return (
      <div className="c-video-section" ref={(c) => { this.video = c; }}>
        <video className="video-player" ref={(c) => { this.videoplayer = c; }} autoPlay loop>
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
