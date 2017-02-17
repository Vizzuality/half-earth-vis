import React from 'react';
import CoverStorySection from './CoverStorySection';
import MeshSection from './MeshSection';
import GalleryOneSection from './GalleryOneSection'; // first gallery
import RangeSection from './RangeSection';
import RangeHalfSection from './RangeHalfSection';
import GalleryTwoSection from './GalleryTwoSection';
import CirclesSection from './CirclesSection';
import VideoSection from './VideoSection';
import EighthSection from './EighthSection';
import InteractiveWorld from './InteractiveWorld';
import objectFitVideos from '../../lib/object-fit-videos';

import './style.scss';

class Story extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop,
      direction: props.direction
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        scrollTop: nextProps.scrollTop,
        direction: nextProps.direction
      }
    );
  }

  render() {
    return (
      <div className="c-story">
        <CoverStorySection scrollTop={this.state.scrollTop} />
        <MeshSection scrollTop={this.state.scrollTop} />
        <GalleryOneSection scrollTop={this.state.scrollTop} direction={this.state.direction} />
        <RangeSection scrollTop={this.state.scrollTop} />
        <RangeHalfSection scrollTop={this.state.scrollTop} />
        <GalleryTwoSection scrollTop={this.state.scrollTop} direction={this.state.direction} />
        <CirclesSection scrollTop={this.state.scrollTop} />
        <VideoSection scrollTop={this.state.scrollTop} />
      </div>
    );
  }

}

Story.propTypes = {
  scrollTop: React.PropTypes.number,
  direction: React.PropTypes.bool
};

export default Story;
