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
      minY: this.refs.cover.offsetTop,
      maxY: this.refs.cover.offsetTop + window.innerHeight
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const isMouseActive = (this.state.scrollTop < ((this.state.maxY - this.state.minY) + 125) / 2);
    return (
      <div className="c-cover z2" ref="cover">
        <h1>
          We  live<br />
          in a<br />
          disappearing<br />
          world<br />
        </h1>
        <Mouse active={ isMouseActive } />
      </div>
    );
  }

}

export default CoverStorySection;
