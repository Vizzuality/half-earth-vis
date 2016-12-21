import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';
import firstImage from './assets/road.jpg';
import secondImage from './assets/tigers.jpg';
import fourthImage from './assets/tree.jpg';
import sixthImage from './assets/mallard.jpg';


class GalleryOneSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  componentDidMount() {
    this.moveGallery();
  }


  componentDidUpdate() {
    this.moveGallery();
  }

  moveGallery() {
    const transYRegex = /\.*translateY\((.*)px\)/i;
    let firstTranslate = 0;
    let secondTranslate = 0;
    let thirdTranslate = 0;
    let fourthTranslate = 0;
    let fifthTranslate = 0;
    let sixthTranslate = 0;
    if (
        this.firstImage.style.transform && this.secondImage.style.transform
        && this.thirdImage.style.transform && this.fourthImage.style.transform
        && this.fifthImage.style.transform && this.sixthImage.style.transform
    ) {
      if (this.props.direction === false) { // up
        firstTranslate = parseInt(transYRegex.exec(this.firstImage.style.transform)[1]) - 1;
        secondTranslate = parseInt(transYRegex.exec(this.secondImage.style.transform)[1]) + 1;
        thirdTranslate = parseInt(transYRegex.exec(this.thirdImage.style.transform)[1]) - 1;
        fourthTranslate = parseInt(transYRegex.exec(this.fourthImage.style.transform)[1]) + 1;
        fifthTranslate = parseInt(transYRegex.exec(this.fifthImage.style.transform)[1]) - 1;
        sixthTranslate = parseInt(transYRegex.exec(this.sixthImage.style.transform)[1]) + 1;
      } else { // down
        firstTranslate = parseInt(transYRegex.exec(this.firstImage.style.transform)[1]) + 1;
        secondTranslate = parseInt(transYRegex.exec(this.secondImage.style.transform)[1]) - 1;
        thirdTranslate = parseInt(transYRegex.exec(this.thirdImage.style.transform)[1]) + 1;
        fourthTranslate = parseInt(transYRegex.exec(this.fourthImage.style.transform)[1]) - 1;
        fifthTranslate = parseInt(transYRegex.exec(this.fifthImage.style.transform)[1]) + 1;
        sixthTranslate = parseInt(transYRegex.exec(this.sixthImage.style.transform)[1]) - 1;
      }
    }

    if (this.props.scrollTop >= (this.gallery.offsetTop - 400) &&
    this.props.scrollTop <= ((this.gallery.offsetTop + window.innerHeight) - 200)) {
      // animate the gallery
      this.firstImage.style.transform = `translateY(${firstTranslate}px)`;
      this.secondImage.style.transform = `translateY(${secondTranslate}px)`;
      this.thirdImage.style.transform = `translateY(${thirdTranslate}px)`;
      this.fourthImage.style.transform = `translateY(${fourthTranslate}px)`;
      this.fifthImage.style.transform = `translateY(${fifthTranslate}px)`;
      this.sixthImage.style.transform = `translateY(${sixthTranslate}px)`;
    } else {
      // not animate the gallery
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
          <img
            className="second-image-one"
            src={secondImage}
            alt="Tigers"
            ref={(c) => { this.secondImage = c; }}
          />
          <img
            className="fourth-image-one"
            src={fourthImage}
            alt="Mountain with tree"
            ref={(c) => { this.fourthImage = c; }}
          />
          <img
            className="sixth-image-one"
            src={sixthImage}
            alt="Mallard"
            ref={(c) => { this.sixthImage = c; }}
          />
          <div className="text-section first z4">
            <p>Suitable habitat, crucial to nature’s survival,</p>
            <p>is shrinking fast. In fact the rate of</p>
            <p>extinction today is at least 1,000 times</p>
            <p>higher than at any time in Earth’s history.</p>
          </div>

          <div className="text-section second z4">
            <TitleSection text="We must acT NOW" />
            <p>Before we’ve lost irreplaceable species</p>
            <p>and ecosystems forever.</p>
          </div>
        </div>

        <div className="large-image">
          <div
            className="third-image-one"
            ref={(c) => { this.thirdImage = c; }}
          >{''}</div>
        </div>

        <div className="large-image">
          <div
            className="fifth-image-one"
            ref={(c) => { this.fifthImage = c; }}
          >{''}</div>
        </div>
      </div>
    );
  }

}

GalleryOneSection.propTypes = {
  scrollTop: React.PropTypes.number,
  direction: React.PropTypes.bool,
};

export default GalleryOneSection;
