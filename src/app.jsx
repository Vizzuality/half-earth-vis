import 'normalize.css';
import './styles/lib/foundation.css';
import './styles/index.scss';

import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
// import {Globe} from 'vizz-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Story from './components/Story';
import WorldStatic from './components/WorldStatic';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', _.debounce(() => {
      this.setState({ scrollTop: window.pageYOffset });
    }, 16));
  }

  render() {
    return (
      <div>
        <WorldStatic />
        <Header />
        <Sidebar />
        <Story scrollTop={this.state.scrollTop} />
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
