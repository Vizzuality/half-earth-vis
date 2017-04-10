import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class InteractiveWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  componentDidMount() {
    this.showInstruction();
  }


  componentDidUpdate() {
    this.showInstruction();
  }

  showInstruction() {
    const state = {
      minY: this.interactive.offsetTop,
      maxY: this.interactive.offsetTop
    };

    const info = document.querySelector('.contain-checks');
    const infolegends = document.querySelector('.contain-legends');
    const isInfoShow = this.props.scrollTop > (state.minY - 200);

    if (isInfoShow) {
      document.querySelector('.explore-text').style.opacity = '1';
      document.querySelector('.footer-text').style.opacity = '1';
      info.style.opacity = '1';
      infolegends.style.opacity = '1';
    } else {
      document.querySelector('.explore-text').style.opacity = '0';
      document.querySelector('.footer-text').style.opacity = '0';
      info.style.opacity = '0';
      infolegends.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-interactive-world-section z2" ref={(c) => { this.interactive = c; }}>
        <TitleSection text="We can if we want to" align="center" />
      </div>
    );
  }

}

InteractiveWorld.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default InteractiveWorld;
