import React from 'react';
import './style.scss';
import logoImage from './logo.png';

class HeaderComponent extends React.Component {
  render() {
    return (
      <header className="c-header">
        <a href="/" className="brand">
          <img src={logoImage} alt="Half Earth project" />
        </a>
        <nav className="menu">
          <ul>
            <li>
              <span href="{undefined}">About</span>
            </li>
            <li>
              <a href="{undefined}">Videos</a>
            </li>
            <li>
              <a href="{undefined}">Blog</a>
            </li>
            <li className="round">
              <a href="{undefined}">Donate</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComponent;
