import 'normalize.css';
import _ from 'underscore';
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
      direction: false,
      rotate: false
    };
  }

  componentDidMount() {
    location.hash = (location.hash) ? location.hash : ' '; // improve scrollTop reload
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
        <Globe
          autorotate={this.state.rotate}
          width={580}
          height={580}
          scrollTop={this.state.scrollTop}
        />
      <Mesh width={600} height={580} />
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
        { window.location.search !== '?embed=true' ? <Header /> : null }
        <Sidebar />
        <Story scrollTop={this.state.scrollTop} direction={this.state.direction} />
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
