import React from 'react';
import './style.scss';
import CircleOne from './assets/circle-1.svg';
import CircleTwo from './assets/circle-2.svg';
import CircleThree from './assets/circle-3.svg';
import CircleFour from './assets/circle-4.svg';
import CircleFive from './assets/circle-5.svg';
import CircleSix from './assets/circle-6.svg';
import CircleSeven from './assets/circle-7.svg';


class LineCircles extends React.Component {

  render() {
    return (
      <div className="c-line-circles z2">
        <img src={CircleOne} className="-spin" alt="circle one" />
        <img src={CircleTwo} className="-spin" alt="circle two" />
        <img src={CircleThree} className="-spin" alt="circle three" />
        <img src={CircleFour} className="-spin-reverse" alt="circle four" />
        <img src={CircleFive} className="-spin" alt="circle five" />
        <img src={CircleSix} className="-spin-reverse-slow" alt="circle six" />
        <img src={CircleSeven} className="-spin" alt="circle seven" />
      </div>
    );
  }

}

export default LineCircles ;
