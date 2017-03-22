import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Globe from './components/Globe';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Story from './components/Story';
import Mesh from './components/Mesh';
import RangerHalfD3 from './components/RangerHalfD3';
import Circles from './components/Circles';
import CirclesDark from './components/CirclesDark';
import BackgroundChange from './components/BackgroundChange';
import LineCircles from './components/LineCircles';
import './styles/index.scss';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      direction: false
    };
  }

  componentDidMount() {
    location.hash = (location.hash) ? location.hash : ' '; // improve scrollTop reload

    this.state = {
      scrollTop: document.body.scrollTop
    };

    window.addEventListener('scroll', (ev) => {
      requestAnimationFrame(() => {
        this.setState({ scrollTop: ev.srcElement.body.scrollTop });
      });
    });

    window.addEventListener('wheel', (ev) => {
      requestAnimationFrame(() => {
        this.setState({ direction: ev.deltaY >= 0 });
      });
    });
  }

  shouldRotate() {
    return false;
    // return (navigator.userAgent.indexOf('Chrome') > -1 ||
    //   navigator.userAgent.indexOf('Edge') > -1);
  }

  render() {
    return (
      <div>
        <Globe
          autorotate={this.shouldRotate()}
          width={580}
          height={580}
          scrollTop={this.state.scrollTop}
        />
        <Mesh width={600} height={580} scrollTop={this.state.scrollTop} />
        <RangerHalfD3
          scrollTop={this.state.scrollTop}
          direction={this.state.direction}
          width={580}
          height={580}
        />
        <Circles />
        <CirclesDark />
        <LineCircles />
        <BackgroundChange />
        <Story scrollTop={this.state.scrollTop} direction={this.state.direction} />
        <Sidebar />
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
