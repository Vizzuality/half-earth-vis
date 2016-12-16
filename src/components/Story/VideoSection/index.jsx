import React from 'react';
import $ from 'jquery';
import './style.scss';


class VideoSection extends React.Component{

  // IMPROVE CODE

  render() {
    return (
      <div className="c-video-section">
        <video className="video-player" autoPlay loop>
          <source src="src/components/Story/SeventhSection/assets/demo.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

}

export default VideoSection;
