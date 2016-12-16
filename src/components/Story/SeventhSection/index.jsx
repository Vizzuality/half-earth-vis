import React from 'react';
import $ from 'jquery';
import './style.scss';


class SeventhSection extends React.Component{

  // IMPROVE CODE

  openVideo(e) {
    $('.play-button').css('display', 'none');
    $('.video-player').toggleClass('-opened');
    $('.backdark').toggleClass('-opened');
    setTimeout(function(){
      $('.video-player')[0].play();
    }, 1100);
  }

  closeVideo(e) {
    $('.video-player').toggleClass('-opened');
    $('.backdark').toggleClass('-opened');
  }

  render() {
    return (
      <div className="c-seventh-section">
        <span className="play-button" onClick={(e) => this.openVideo(e)}>Play video</span>
        {/*<span className="close-video-button" onClick={(e) => this.closeVideo(e)}>X</span>*/}
        <div className="backdark">{''}</div>
          <video className="video-player">
            <source src="src/components/Story/SeventhSection/assets/demo.mp4" type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
      </div>
    );
  }

}

export default SeventhSection ;
