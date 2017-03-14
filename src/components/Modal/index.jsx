import React from 'react';
import './style.scss';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: props.image
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', function(evt) {
      if (this.el && evt && evt.keyCode === 27) {
        this.el.style.top = '150%';
      }
    }.bind(this));
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

  closeModal(ev) {
    if (ev) {
      ev.preventDefault();
    }
    const header = document.querySelector('.c-header');
    if (header) header.style.zIndex = '10';
    if (this.el) this.el.style.top = '150%';
  }

  render() {
    const imageClass = ['image', 'image-modal'];
    if (this.props.image) imageClass.push(`-modal${this.props.image}-image`);
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
