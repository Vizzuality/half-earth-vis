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

    const info = document.querySelector('.info-world');
    const isInfoShow = this.props.scrollTop > (state.minY - 200);

    if (isInfoShow) {
      info.style.opacity = '1';
    } else {
      info.style.opacity = '0';
    }
  }

  render() {
    return (
      <div className="c-interactive-world-section wrap z2" ref={(c) => { this.interactive = c; }}>
        <TitleSection text="We can if we want to" align="center" />
      </div>
    );
  }

}

InteractiveWorld.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default InteractiveWorld;
