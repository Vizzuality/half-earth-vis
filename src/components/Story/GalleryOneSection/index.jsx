import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';
import firstImage from './assets/road.jpg';
import secondImage from './assets/tigers.jpg';
import fourthImage from './assets/tree.jpg';
import sixthImage from './assets/mallard.jpg';


class GalleryOneSection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
    };
  }

  componentDidMount() {
    this.moveGallery();
  }


  componentDidUpdate() {
    this.moveGallery();
  }

  moveGallery() {
    if (this.props.scrollTop >= (this.gallery.offsetTop - 200) &&
    this.props.scrollTop <= ((this.gallery.offsetTop + window.innerHeight) - 100)) {
      // Inner
    } else {
      // Out
    }
  }

  render() {
    return (
      <div className="c-gallery-one-section z2" ref={(c) => { this.gallery = c; }}>
        <div className="wrap">
          <img
            className="first-image-one"
            src={firstImage}
            alt="Road"
            ref={(c) => { this.firstImage = c; }}
          />
          <img className="second-image-one" src={secondImage} alt="Tigers" />
          <img className="fourth-image-one" src={fourthImage} alt="Mountain with tree" />
          <img className="sixth-image-one" src={sixthImage} alt="Mallard" />
          <div className="text-section first">
            <p>Suitable habitat, crucial to nature’s survival,</p>
            <p>is shrinking fast. In fact the rate of</p>
            <p>extinction today is at least 1,000 times</p>
            <p>higher than at any time in Earth’s history.</p>
          </div>

          <div className="text-section second">
            <TitleSection text="We must acT NOW" />
            <p>Before we’ve lost irreplaceable species</p>
            <p>and ecosystems forever.</p>
          </div>
        </div>

        <div className="large-image">
          <div className="third-image-one">{''}</div>
        </div>

        <div className="large-image">
          <div className="fifth-image-one">{''}</div>
        </div>
      </div>
    );
  }

}

GalleryOneSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default GalleryOneSection;
