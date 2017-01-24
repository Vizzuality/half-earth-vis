import React from 'react';
import stars from '../../../images/bg-stars-large.jpg';
import videoPath from './assets/demo.mp4';
import './style.scss';

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };


class VideoSection extends React.Component{

  constructor(props) {
    console.log(window.scrollY);
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
      video: '',
      scroll: 0
    };
  }

  componentDidMount() {
    this.checkPlayVideo();
  }

  componentDidUpdate() {
    this.checkPlayVideo();
  }

  //openWorld(e) {
  //   console.log('hello');
  //   document.querySelector('.vizz-component-globe').classList.add('back');
  //   document.querySelector('.vizz-component-globe').style.top = '50%';
  // }

  checkPlayVideo() {
    const containBackground = document.querySelector('.c-background-change');
    const containBackBlueTwo = document.querySelector('.back-blue-two');
    const state = {
      minY: this.video.offsetTop,
      maxY: this.video.offsetTop + window.innerHeight,
      video: this.videoplayer
    };

     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       document.querySelector('.vizz-component-globe').classList.add('back');
       document.querySelector('canvas').classList.add('back');
       this.video.classList.add('stop');
       this.state = {
         scroll: window.scrollY
       };
       setTimeout(function(){
         document.querySelector('.c-story').style.height = `calc(${window.scrollY + 100}px + 100vh)`;
       }, 1000);
     } else {
        // document.querySelector('.vizz-component-globe').classList.remove('back');
        this.videoplayer.pause();
     }
     if ((this.state.scroll + 100) - window.scrollY < 1 && (this.state.scroll + 100) - window.scrollY > 0) {
       document.querySelector('.vizz-component-globe').style.top = '0';
       document.querySelector('.first-text').style.opacity = '1';
       document.querySelector('.vizz-component-globe').style.zIndex = '30';
       document.querySelector('canvas').classList.remove('back');
       this.videoplayer.pause();
       this.videoplayer.currentTime = 0;
     } else {
      //  console.log('hello');
     }

    const half = (state.minY - state.maxY) / 2;
    const isVideoPlay = (this.props.scrollTop > (state.minY - 200)
    && this.props.scrollTop < (state.maxY + half));

    if (isVideoPlay === true) {
      containBackground.style.background = 'transparent';
      containBackBlueTwo.style.opacity = '0';
    } else {
      // this.videoplayer.pause();
      // this.videoplayer.currentTime = 0;
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
