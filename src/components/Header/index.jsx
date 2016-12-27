import React from 'react';
import './style.scss';
import logoImage from './logo.png';

class HeaderComponent extends React.Component {

  openModal() {
    document.querySelector('.c-modal').style.display = 'flex';
  }

  render() {
    return (
      <header className="c-header z4">
        <a href="/" className="brand">
          <img src={logoImage} alt="Half Earth project" />
        </a>
        <nav className="menu">
          <ul>
            <li>
              <span href="{undefined}" onClick={(e) => this.openModal(e)}>About</span>
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
