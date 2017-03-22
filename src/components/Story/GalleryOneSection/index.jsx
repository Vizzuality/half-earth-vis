import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';
import firstImage from './assets/_hand_with_bird.jpg';
import secondImage from './assets/_deer.jpg';
import fourthImage from './assets/tree.jpg';
import sixthImage from './assets/mallard.jpg';


class GalleryOneSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop
    };
  }

  componentWillReceiveProps(nextProps) {
    const minY = 1040;
    const maxY = 2900;
    if (nextProps.scrollTop >= minY && nextProps.scrollTop <= maxY) {
      this.setState({ scrollTop: nextProps.scrollTop });
    }
  }

  componentDidUpdate() {
    this.moveGallery();
  }

  moveGallery() {
    const y = document.body.scrollTop - this.gallery.offsetTop;
    const elements = [
      { el: this.secondImage, velocity: 0.2 },
      { el: this.fourthImage, velocity: 0.2 },
      { el: this.fifthImage, velocity: 0.2 }
    ];

    for (let i = elements.length - 1; i >= 0; i--) {
      const diff = elements[i].el.offsetTop - y;
      const y1 = diff * elements[i].velocity;
      elements[i].el.style.transform = `translateY(${y1}px)`;
    }
  }

  render() {
    return (
      <div className="c-gallery-one-section z3" ref={(c) => { this.gallery = c; }}>
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
          <div
            className="text-section first z4"
            ref={(c) => { this.firstText = c; }}
          >
            <p>Suitable habitat, crucial to nature’s survival,</p>
            <p>is shrinking fast. In fact the rate of</p>
            <p>extinction today is at least 1,000 times</p>
            <p>higher than at any time in Earth’s history.</p>
          </div>

          <div
            className="text-section second z4"
            ref={(c) => { this.secondText = c; }}
          >
            <TitleSection text="We must act now" />
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
  scrollTop: React.PropTypes.number
};

export default GalleryOneSection;
