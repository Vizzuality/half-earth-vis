import './style.scss';
import React from 'react';
import logoImage from './logo-half-earth-white.png';

class HeaderComponent extends React.Component {

  render() {
    return (
      <header className="c-header">
        <a href="/" className="brand">
          <img src={logoImage} alt="Half Earth project" />
        </a>
      </header>
    );
  }

}

export default HeaderComponent;

