import 'normalize.css';
import './styles/lib/foundation.css';
import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Globe from './components/Globe';
import Story from './components/Story';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.setState({ scrollTop: window.pageOffsetY });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Globe scrollTop={this.state.scrollTop} />
        <Sidebar />
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
