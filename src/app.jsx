import 'normalize.css';
import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import Globe from './components/Globe';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Story from './components/Story';
import Mesh from './components/Mesh';
import RangerD3 from './components/RangerD3';
import RangerHalfD3 from './components/RangerHalfD3';
import Circles from './components/Circles';
import CirclesDark from './components/CirclesDark';
import BackgroundChange from './components/BackgroundChange';
import LineCircles from './components/LineCircles';
import Modal from './components/Modal';
import './styles/index.scss';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      direction: false,
      rotate: false
    };
  }

  componentDidMount() {

    this.state = {
      scrollTop: window.pageYOffset
    };

    window.addEventListener('scroll', _.debounce(() => {
      this.setState({ scrollTop: window.pageYOffset });
    }, 1));

    window.addEventListener('wheel', _.debounce((e) => {
      if (e.deltaY < 0) {
        this.setState({ direction: false });
      } else {
        this.setState({ direction: true });
      }
    }, 1));

    // this.knowBrowser();
  }

  knowBrowser() {
    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
      this.setState({ rotate: true });
    }

    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      this.setState({ rotate: false });
    }

    if (navigator.userAgent.indexOf('Safari') !== -1) {
      this.setState({ rotate: true });
    }

    if (navigator.userAgent.indexOf('Firefox') !== -1) {
      this.setState({ rotate: true });
    }

    if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) {
      this.setState({ rotate: false });
    }

    if (navigator.userAgent.indexOf('Edge') > -1) {
      this.setState({ rotate: false });
    }
  }

  render() {
    return (
      <div>
        <Globe autorotate={this.state.rotate} width={700} height={700} scrollTop={this.state.scrollTop} />
        <Mesh width={700} height={700} />
        <RangerD3 width={700} height={700} />
        <RangerHalfD3 width={700} height={700} />
        <Circles />
        <CirclesDark />
        <LineCircles />
        <BackgroundChange />
        <Header />
        <Sidebar />
        <Story scrollTop={this.state.scrollTop} direction={this.state.direction} />
        <Modal />
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
