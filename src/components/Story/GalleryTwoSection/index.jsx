import React from 'react';
import './style.scss';
import firstImage from './assets/_seal.jpg';
import secondImage from './assets/eowilson.jpg';
import fifthImage from './assets/bird.jpg';
import sixthImage from './assets/_ducks.jpg';


class GalleryTwoSection extends React.Component {
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
    const circles = [
      { el: document.querySelector('.animate-pulse-dark'), velocity: 2.4 },
      { el: document.querySelector('.animate-pulse-second-dark'), velocity: 2 },
      { el: document.querySelector('.animate-pulse-third-dark'), velocity: 1.6 },
      { el: document.querySelector('.animate-pulse-fourth-dark'), velocity: 1.2 }
    ];

    for (let i = circles.length - 1; i >= 0; i--) {
      circles[i].el.style.transform = 'scale(0)';
    }

    const videoContainer = document.querySelector('.c-video-section');
    const minYVideo = videoContainer.offsetTop;
    const maxYVideo = videoContainer.offsetTop + window.innerHeight;
    const half = (maxYVideo - minYVideo) / 2;
    const circleAnimation = ((this.props.scrollTop - ((this.gallery.offsetTop + window.innerHeight) - half)) / half) - 1;
    const containCircleLines = document.querySelector('.c-line-circles');
    const containCircleDark = document.querySelector('.c-circles-dark');
    let opacityAnimation = circleAnimation / 5;
    opacityAnimation <= 0.1 ? null : opacityAnimation = 0.1;

    const y = window.pageYOffset - this.gallery.offsetTop;
    const elements = [
      { el: this.secondImage, velocity: 0.2 },
      { el: this.thirdImage, velocity: 0.2 },
      { el: this.fifthImage, velocity: 0.2 }
    ];

    for (let i = elements.length - 1; i >= 0; i--) {
      const diff = elements[i].el.offsetTop - y;
      const y1 = diff * (elements[i].velocity || 0);
      elements[i].el.style.transform = `translateY(${y1}px)`;
    }

    if (this.props.scrollTop > (this.gallery.offsetTop + window.innerHeight) && this.props.scrollTop < (minYVideo - half)) {
      containCircleLines.style.opacity = '1';
      containCircleDark.style.opacity = '1';
      for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].el.style.opacity = `${opacityAnimation}`;
        circles[i].el.style.transform = `scale(${circleAnimation * circles[i].velocity})`;
      }
    } else {
      containCircleLines.style.opacity = '0';
      containCircleDark.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-gallery-two-section z3" ref={(c) => { this.gallery = c; }}>
        <div className="wrap">
          <img
            className="first-image-two"
            src={firstImage}
            alt="Scouts"
            ref={(c) => { this.firstImage = c; }}
          />
          <img
            className="second-image-two"
            src={secondImage}
            alt="EO wilson"
            ref={(c) => { this.secondImage = c; }}
          />
          <img
            className="fifth-image-two"
            src={fifthImage}
            alt="Bird"
            ref={(c) => { this.fifthImage = c; }}
          />
          <img
            className="sixth-image-two"
            src={sixthImage}
            alt="Helicopter"
            ref={(c) => { this.sixthImage = c; }}
          />
          <div
            className="text-section first z4"
            ref={(c) => { this.firstText = c; }}
          >
            <p>The Half-Earth Project will drive</p>
            <p>the research needed to better understand</p>
            <p>and care for our world,</p>
          </div>
          <div
            className="text-section second z4"
            ref={(c) => { this.secondText = c; }}
          >
            <p>provide leadership</p>
            <p>to guide conservation efforts,</p>
          </div>
          <div
            className="text-section third z4"
            ref={(c) => { this.thirdText = c; }}
          >
            <p>and engage people</p>
            <p>in the transcendent goal of Half-Earth.</p>
          </div>
        </div>
        <div className="large-image">
          <div
            className="third-image-two"
            ref={(c) => { this.thirdImage = c; }}
          >{''}</div>
        </div>
        <div className="large-image">
          <div
            className="fourth-image-two"
            ref={(c) => { this.fourthImage = c; }}
          >{''}</div>
        </div>
      </div>
    );
  }
}

GalleryTwoSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default GalleryTwoSection ;
