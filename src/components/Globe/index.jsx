import './style.scss';

import React from 'react';
import * as THREE from 'three';
import orbitControl from 'three-orbit-controls';
import earthImage from './images/earth-clouds.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import { latLongToVector3, addStats } from './utils';

const Control = orbitControl(THREE);

class GlobeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop
    };
  }

  componentDidMount() {
    const width = this.props.width || window.innerWidth;
    const height = this.props.height || window.innerHeight;

    const fov = 45;
    const near = 1;
    const far = 1500;

    this.scene = new THREE.Scene();
    this.imageLoader = new THREE.TextureLoader();
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setSize(width, height);

    // Appending to DOM
    this.el.appendChild(this.renderer.domElement);

    this.addControls();
    this.addLights();
    this.addGlobe();
    this.addMarkers();

    this.camera.position.z = (far / 2) * 0.90;

    this.draw();

    // Adding frame stats for development
    if (config.env === 'development') {
      addStats();
    }
  }

  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.control.dampingFactor = 0.1;
    this.control.autoRotate = this.props.autorotate;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = this.props.velocity;
    this.control.autoRotateSpeed = this.props.velocity;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 3, 40);
    this.scene.add(ambientLight);
    this.scene.add(this.directionalLight);
  }

  addGlobe() {
    const material = new THREE.MeshPhongMaterial({
      map: this.imageLoader.load(this.props.earthImage),
      bumpMap: this.imageLoader.load(this.props.earthBumpImage),
      bumpScale: 2
    });
    const geometry = new THREE.SphereGeometry(this.props.radius, 40, 30);
    const earth = new THREE.Mesh(geometry, material);
    earth.rotation.y = Math.PI;
    earth.updateMatrix();

    this.scene.add(earth);
  }

  addMarkers() {
    const data = [{lat: 40, lng: -3}];

    for (var i = data.length - 1; i >= 0; i--) {
      const position = latLongToVector3(data[i].lat, data[i].lng, 50, 100);
      console.log(position);
    }
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.directionalLight.position.copy(this.camera.position);
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div ref={(node) => this.el = node} className="vizz-component-globe"></div>
    );
  }

}

GlobeComponent.defaultProps = {
  width: 500,
  height: 500,
  radius: 200,
  autorotate: true,
  velocity: 0.05,
  scrollTop: 0,
  earthImage: earthImage,
  earthBumpImage: earthBumpImage
};

export default GlobeComponent;
