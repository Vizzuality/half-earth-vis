import React from 'react';

import './style.scss';


class SidebarComponent extends React.Component {

  render() {
    return (
      <aside className="c-sidebar z4">
        <div className="contain-share">
          <div className="share">
            <a href="https://www.facebook.com/eowilsonfoundation">
              <svg className="c-icon -small">
                <use xlinkHref="#icon-fb">{''}</use>
              </svg>
            </a>
          </div>

          <div className="share">
            <a href="https://twitter.com/EOWilsonFndtn">
              <svg className="c-icon -small">
                <use xlinkHref="#icon-twitter">{''}</use>
              </svg>
            </a>
          </div>

          <div className="share">
            <a href="https://www.youtube.com/user/EOWilsonBiodiversity">
              <svg className="c-icon -small">
                <use xlinkHref="#icon-youtube">{''}</use>
              </svg>
            </a>
          </div>

          <div className="share">
            <a href="https://vimeo.com/eowilson">
              <svg className="c-icon -small">
                <use xlinkHref="#icon-vimeo">{''}</use>
              </svg>
            </a>
          </div>
        </div>
      </aside>
    );
  }

}

export default SidebarComponent;
