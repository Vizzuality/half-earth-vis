import React from 'react';

import './style.scss';


class SidebarComponent extends React.Component {

  render() {
    return (
      <aside className="c-sidebar">
        <div className="share">
          <a href={undefined}>
            <svg className="c-icon -small">
              <use xlinkHref="#icon-fb">{''}</use>
            </svg>
          </a>
        </div>

        <div className="share">
          <a href={undefined}>
            <svg className="c-icon -small">
              <use xlinkHref="#icon-twitter">{''}</use>
            </svg>
          </a>
        </div>
      </aside>
    );
  }

}

export default SidebarComponent;
