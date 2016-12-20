import React from 'react';
import $ from 'jquery';
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
    const state = {
      minY: this.refs.video.offsetTop,
      maxY: this.refs.video.offsetTop + window.innerHeight,
      video: this.refs.videoplayer
    };

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    isVideoPlay ? this.refs.videoplayer.play() : this.refs.videoplayer.pause();
  }

  render() {
    return (
      <div className="c-video-section" ref="video">
        <video className="video-player" ref="videoplayer" autoPlay loop>
          <source src="src/components/Story/VideoSection/assets/demo.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

}

export default VideoSection;
