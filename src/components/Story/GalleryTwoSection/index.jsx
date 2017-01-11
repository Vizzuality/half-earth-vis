import React from 'react';
import './style.scss';
import firstImage from './assets/scouts.jpg';
import secondImage from './assets/eowilson.jpg';
import fifthImage from './assets/bird.jpg';
import sixthImage from './assets/helicopter.jpg';


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
    const circleOne = document.querySelector('.animate-pulse-dark');
    const circleTwo = document.querySelector('.animate-pulse-second-dark');
    const circleThree = document.querySelector('.animate-pulse-third-dark');
    const circleFour = document.querySelector('.animate-pulse-fourth-dark');
    circleOne.style.transform = 'scale(0)';
    circleTwo.style.transform = 'scale(0)';
    circleThree.style.transform = 'scale(0)';
    circleFour.style.transform = 'scale(0)';

    const videoContainer = document.querySelector('.c-video-section');
    const minYVideo = videoContainer.offsetTop;
    const maxYVideo = videoContainer.offsetTop + window.innerHeight;
    const half = (maxYVideo - minYVideo) / 2;
    const circleAnimation = ((this.props.scrollTop - ((this.gallery.offsetTop + window.innerHeight) - half)) / half) - 1;
    let opacityAnimation = circleAnimation / 5;
    if (opacityAnimation <= 0.6) {

    } else {
      opacityAnimation = 0.6;
    }

    const containCircleLines = document.querySelector('.c-line-circles');
    const containCircleDark = document.querySelector('.c-circles-dark');
    const height = this.gallery.offsetHeight;
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
        firstTranslate = parseFloat(transYRegex.exec(this.firstImage.style.transform)[1]) - 0.4;
        secondTranslate = parseFloat(transYRegex.exec(this.secondImage.style.transform)[1]) + 0.45;
        thirdTranslate = parseFloat(transYRegex.exec(this.thirdImage.style.transform)[1]) - 0.35;
        fourthTranslate = parseFloat(transYRegex.exec(this.fourthImage.style.transform)[1]) + 0.45;
        fifthTranslate = parseFloat(transYRegex.exec(this.fifthImage.style.transform)[1]) - 0.4;
        sixthTranslate = parseFloat(transYRegex.exec(this.sixthImage.style.transform)[1]) + 0.3;
      } else { // down
        firstTranslate = parseFloat(transYRegex.exec(this.firstImage.style.transform)[1]) + 0.4;
        secondTranslate = parseFloat(transYRegex.exec(this.secondImage.style.transform)[1]) - 0.45;
        thirdTranslate = parseFloat(transYRegex.exec(this.thirdImage.style.transform)[1]) + 0.35;
        fourthTranslate = parseFloat(transYRegex.exec(this.fourthImage.style.transform)[1]) - 0.45;
        fifthTranslate = parseFloat(transYRegex.exec(this.fifthImage.style.transform)[1]) + 0.4;
        sixthTranslate = parseFloat(transYRegex.exec(this.sixthImage.style.transform)[1]) - 0.3;
      }
    }

    if (this.props.scrollTop >= (this.gallery.offsetTop - (height / 2)) &&
    this.props.scrollTop <= (this.gallery.offsetTop + window.innerHeight)) {
      // animate the gallery
      this.firstImage.style.transform = `translateY(${firstTranslate}px)`;
      this.secondImage.style.transform = `translateY(${secondTranslate}px)`;
      this.thirdImage.style.transform = `translateY(${thirdTranslate}px)`;
      this.fourthImage.style.transform = `translateY(${fourthTranslate}px)`;
      this.fifthImage.style.transform = `translateY(${fifthTranslate}px)`;
      this.sixthImage.style.transform = `translateY(${sixthTranslate}px)`;
      this.firstText.style.transform = `translateY(${thirdTranslate}px)`;
      this.secondText.style.transform = `translateY(${fourthTranslate}px)`;
      this.thirdText.style.transform = `translateY(${fifthTranslate}px)`;
    } else {
      // not animate the gallery
    }

    if (this.props.scrollTop > (this.gallery.offsetTop + window.innerHeight) && this.props.scrollTop < (minYVideo - half)) {
      containCircleLines.style.opacity = '1';
      containCircleDark.style.opacity = '1';
      circleOne.style.opacity = `${opacityAnimation}`;
      circleTwo.style.opacity = `${opacityAnimation}`;
      circleThree.style.opacity = `${opacityAnimation}`;
      circleFour.style.opacity = `${opacityAnimation}`;
      circleOne.style.transform = `scale(${circleAnimation * 2.4})`;
      circleTwo.style.transform = `scale(${circleAnimation * 2})`;
      circleThree.style.transform = `scale(${circleAnimation * 1.6})`;
      circleFour.style.transform = `scale(${circleAnimation * 1.2})`;
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
  direction: React.PropTypes.bool,
};

export default GalleryTwoSection ;
