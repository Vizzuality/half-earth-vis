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
import 'normalize.css';
import './styles/lib/foundation.css';
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
    window.addEventListener('scroll', _.debounce(() => {
      // if (window.pageYOffset > this.state.scrollTop) {
      //   this.setState({ direction: true });
      // } else {
      //   this.setState({ direction: false });
      // }
      this.setState({ scrollTop: window.pageYOffset });
    }, 16));

    window.addEventListener('wheel', _.debounce((e) => {
      if (e.deltaY < 0) {
        this.setState({ direction: false });
      } else {
        this.setState({ direction: true });
      }
    }, 16));
  }

  render() {
    return (
      <div>
        <Globe autorotate={true} width={700} height={700} />
        <Mesh />
        <RangerD3 />
        <RangerHalfD3 />
        <Header />
        <Sidebar />
        <Story scrollTop={this.state.scrollTop} direction={this.state.direction} />
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
