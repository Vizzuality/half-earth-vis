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

    // isVideoPlay ? this.videoplayer.src = 'https://player.vimeo.com/video/29067223?&autoplay=1&title=0&badge=0&byline=0' : this.videoplayer.src = 'https://player.vimeo.com/video/29067223?&autopause=1&title=0&badge=0&byline=0';
  }

  render() {
    return (
      <div className="c-video-section z4" ref={(c) => { this.video = c; }}>
        <iframe src="https://player.vimeo.com/video/29067223?&autoplay=1&title=0&badge=0&byline=0" ref={(c) => { this.videoplayer = c; }} frameBorder="0"></iframe>
      </div>
    );
  }
}

VideoSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default VideoSection;
