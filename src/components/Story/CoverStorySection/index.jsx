import React from 'react';
import Mouse from '../../Mouse';
import './style.scss';


class CoverStorySection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0,
      scrollTop: props.scrollTop
    };
  }

  componentDidMount() {
    this.setState({
      minY: this.cover.offsetTop,
      maxY: this.cover.offsetTop + window.innerHeight
    });
    console.log(this.title);
    this.title.style.opacity = '1';
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const isMouseActive = (this.state.scrollTop < ((this.state.maxY - this.state.minY) + 125) / 2);
    return (
      <div className="c-cover z3" ref={(c) => { this.cover = c; }}>
        <h1 ref={(c) => { this.title = c; }}>
          We  live<br />
          in a<br />
          disappearing<br />
          world<br />
        </h1>
        <Mouse active={isMouseActive} />
      </div>
    );
  }

}

CoverStorySection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default CoverStorySection;
