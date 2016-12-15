import React from 'react';
import $ from 'jquery';
import './style.scss';


class SeventhSection extends React.Component{

  // IMPROVE CODE

  openVideo(e) {
    $('.play-button').css('display', 'none');
    $('.contain-video-player').removeClass('-close');
    $('.contain-video-player').addClass('-opened');
    $('.backdark').addClass('-opened');
    setTimeout(function(){
      $('.video-player')[0].play();
    }, 1100);
  }

  closeVideo(e) {
    $('.contain-video-player').removeClass('-opened');
    $('.contain-video-player').addClass('-close');
    $('.backdark').removeClass('-opened');
  }

  render() {
    return (
      <div className="c-seventh-section">
        <span className="play-button" onClick={(e) => this.openVideo(e)}>Play video</span>
        <div className="backdark">{''}</div>
          <div className="contain-video-player">
            <video className="video-player -close">
              <source src="src/components/Story/SeventhSection/assets/demo.mp4" type="video/mp4"></source>
              Your browser does not support the video tag.
            </video>
            <span className="close-video-button" onClick={(e) => this.closeVideo(e)}>X</span>
          </div>
      </div>
    );
  }

}

export default SeventhSection ;
