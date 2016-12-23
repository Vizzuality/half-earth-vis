import React from 'react';
import './style.scss';


class EighthSection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  componentDidMount() {
    this.showRange();
  }


  componentDidUpdate() {
    this.showRange();
  }

  showRange() {
    const state = {
      minY: this.eight.offsetTop,
      maxY: this.eight.offsetTop
    };

    const isInvisible = (this.props.scrollTop > state.minY);

    if (isInvisible) {
      document.querySelector('.c-mesh').classList.add('hidden');
      document.querySelector('.c-ranger-d3').classList.add('hidden');
      document.querySelector('.c-ranger-half-d3').classList.add('hidden');
      document.querySelector('.c-line-circles').classList.add('hidden');
    } else {
      document.querySelector('.c-mesh').classList.remove('hidden');
      document.querySelector('.c-ranger-d3').classList.remove('hidden');
      document.querySelector('.c-ranger-half-d3').classList.remove('hidden');
      document.querySelector('.c-line-circles').classList.remove('hidden');
    }
  }


  render() {
    return (
      <div className="c-eighth-section z2" ref={(c) => { this.eight = c; }}>
        <h1>
          Can we save half<br />
          the earth<br />
          for the rest<br />
          of life?<br />
        </h1>
      </div>
    );
  }

}

EighthSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default EighthSection;
