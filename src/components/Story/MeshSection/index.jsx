import React from 'react';
import TitleSection from '../TitleSection';
import './style.scss';


class MeshSection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      minY: 0,
      maxY: 0
    };
  }

  componentDidMount() {
    this.showMesh();
  }


  componentDidUpdate() {
    this.showMesh();
  }

  showMesh() {
    const containMesh = document.querySelector('.c-mesh');
    const state = {
      minY: this.mesh.offsetTop,
      maxY: this.mesh.offsetTop
    };

    const isMesh = (this.props.scrollTop > (state.minY - 250)
    && this.props.scrollTop < (state.maxY));

    if (isMesh) {
      containMesh.style.opacity = '1';
    } else {
      containMesh.style.opacity = '0';
    }
  }


  render() {
    return (
      <div className="c-mesh-section wrap z2" ref={(c) => { this.mesh = c; }}>
        <TitleSection text="Human beings are connected with all of life" align="center" />
        <div className="text-section">
          <p>We depend upon all of nature</p>
          <p>in the same way that nature</p>
          <p>depends upon us.</p>
        </div>
      </div>
    );
  }

}

MeshSection.propTypes = {
  scrollTop: React.PropTypes.number,
};

export default MeshSection;
