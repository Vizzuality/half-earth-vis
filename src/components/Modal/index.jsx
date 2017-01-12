import React from 'react';
import './style.scss';

class Modal extends React.Component {

  closeModal() {
    document.querySelector('.c-modal').style.left = '100%';
  }

  render() {
    return (
      <div className="c-modal z4">
        <div className="image">
          {''}
        </div>
        <div className="information">
          <div className="close" onClick={(e) => this.closeModal(e)}>
            <svg className="c-icon -small">
              <use xlinkHref="#icon-cross">{''}</use>
            </svg>
            <span>esc</span>
          </div>
          <div className="contain-text">
            <h2 className="title-modal"></h2>
            <p className="description-modal">
            Being very big, ancient, and tropical, Madagascar harbors a very
            large and unique fauna and flora, with 70 percent or more of
            its species found nowhere else... Examples of evolutionary
             radiation in Madagascar´s animals are the may, yet closely
             related, species of lemurs (primitive primates), chameleons,
             vangid shrikes, ranid frogs, and among the twelve thousand
             species of plants, complex palms, orchids, baobabs, and cactus-like Didiereaceae.
           </p>
          </div>
        </div>
      </div>
    );
  }

}

export default Modal;
