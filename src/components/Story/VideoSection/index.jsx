import React from 'react';
import Player from '@vimeo/player';
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

    var player = new Player(document.querySelector('iframe'));

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    isVideoPlay ? player.play() : player.pause();
  }

  render() {
    return (
      <div className="c-video-section z4" ref={(c) => { this.video = c; }}>
        <iframe src="https://player.vimeo.com/video/29067223?&&title=0&badge=0&byline=0" ref={(c) => { this.videoplayer = c; }} frameBorder="0"></iframe>
      </div>
    );
  }
}

VideoSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default VideoSection;
