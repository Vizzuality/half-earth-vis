import * as THREE from 'three';
import React from 'react';
import orbitControl from 'three-orbit-controls';
import earthImage from '../../images/earth.jpg';
import earthBumpImage from '../../images/earth-bump.jpg';

const Control = orbitControl(THREE);

class GlobeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.scene = new THREE.Scene();
    this.imageLoader = new THREE.TextureLoader();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
      ></canvas>
    );
  }

}

GlobeComponent.defaultProps = {
  width: 500,
  height: 500
};

export default GlobeComponent;
