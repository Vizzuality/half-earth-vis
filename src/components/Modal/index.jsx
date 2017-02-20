import React from 'react';
import './style.scss';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: props.image
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        image: nextProps.image
      }
    );
    // this.image.style.background = { one };
    // this.image.style.background = `url(${one})`;
  }

  closeModal() {
    document.querySelector('.c-header').style.zIndex = '10';
    this.el.style.top = '100%';
  }

  render() {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode === 27) {
        document.querySelector('.c-modal').style.top = '100%';
      }
    };
    const imageClass = ['image', 'image-modal'];
    if (this.props.image) {
      imageClass.push(`-modal${this.props.image}-image`);
    }
    return (
      <div className="c-modal" ref={(node) => this.el = node}>
        <div className={imageClass.join(' ')} ref={(node) => this.image = node}>
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
            <h2 className="title-modal">{this.props.title}</h2>
            <p className="description-modal">{this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Modal;
