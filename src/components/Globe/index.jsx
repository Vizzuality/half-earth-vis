import React from 'react';
import * as THREE from 'three';
import orbitControl from './control';
import customData from './assets/data.json';

import './style.scss';
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
    this.state = {
      scrollTop: this.props.scrollTop
    };

    const width = this.props.width;
    const height = this.props.height;

    const fov = 45;
    const near = 1;
    const far = 1500;

    this.scene = new THREE.Scene();
    this.imageLoader = new THREE.TextureLoader();
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.camera.position.z = (far / 2) * 0.90;
    this.renderer.setSize(width, height);

    // Appending to DOM
    this.el.appendChild(this.renderer.domElement);

    this.addControls();
    this.addLights();
    this.addGlobe();

    this.draw();

    // Adding frame stats for development
    if (config.env === 'development') {
      addStats();
    }

    if (this.props.scrollRotate) {
      let lastScrollTop = 0;
      window.addEventListener('scroll', function(e) {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // downscroll code
          this.rotateX(1);
        } else {
          // upscroll code
          this.rotateX(-1);
        }
        lastScrollTop = st;
      }.bind(this));
    }

    window.globe = this;
  }

  componentWillReceiveProps(nextProps) {
    const interactive = document.querySelector('.c-interactive-world-section');
    this.setState(
      {
        scrollTop: nextProps.scrollTop
      }
    );
    const conditional = interactive.offsetTop < this.state.scrollTop;
    if (conditional) {
      this.addMarkers();
    } else {
      this.removeMarkers();
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
    earth.updateMatrix();
    this.earth = earth;
    this.scene.add(earth);
  }

  setTexture(imagePath) {
    this.earth.material.needsUpdate = this.imageLoader.load(imagePath);
  }

  addMarkers() {
    const locations = this.calculateLocations();
    // Hector, you can make your magic here :)
  }

  /**
   * Rotate globe to given angle in X axis
   * @param  {Number} angle
   */
  rotateX(angle) {
    this.control.customRotate(angle);
  }

  oldAddMarkers() {
    const geom = new THREE.Geometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const imageData = 'data:image/png;base64,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';
    this.texture = THREE.ImageUtils.loadTexture(imageData);
    this.material = new THREE.MeshPhongMaterial({ map: this.texture, side: THREE.DoubleSide, alphaTest: 0.5, transparent: true });

    for (let i = customData.length - 1; i >= 0; i--) {
      // calculate the position
      const lat = customData[i].Latitude;
      const lng = customData[i].Longtitude;
      const radio = this.props.radius;
      const height = 6;
      const position = latLongToVector3(lat, lng, radio, height);

      const geometry = new THREE.PlaneGeometry(14, 20);
      this.marker = new THREE.Mesh(geometry, this.material);

      this.marker.position.set(position.x, position.y, position.z);
      this.marker.rotateY(-Math.PI);

      geom.mergeMesh(this.marker);
    }

    // create a new mesh, containing all the other meshes.
    this.total = new THREE.Mesh(geom, this.material);

    // and add the total mesh to the scene
    this.scene.add(this.total);
  }

  removeMarkers() {
    if (this.material !== null) {

    }
  }

  calculateLocations() {
    return customData.map((data) => {
      // calculate the position
      const lat = data.Latitude;
      const lng = data.Longtitude;
      const radio = this.props.radius;
      const height = 6;
      const position = latLongToVector3(lat, lng, radio, height);
      return Object.assign({}, position);
    });
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.directionalLight.position.copy(this.camera.position);
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div ref={(node) => this.el = node} className="vizz-component-globe z2">{''}</div>
    );
  }

}

GlobeComponent.defaultProps = {
  width: window.innerWidth,
  height: 500,
  radius: 200,
  autorotate: true,
  velocity: 0.01,
  scrollTop: 0,
  earthImage: earthImage,
  earthBumpImage: earthBumpImage,
  scrollRotate: true,
};

GlobeComponent.propTypes = {
  autorotate: React.PropTypes.bool,
  width: React.PropTypes.number,
  scrollTop: React.PropTypes.number,
  height: React.PropTypes.number,
  velocity: React.PropTypes.number,
  radius: React.PropTypes.number,
  earthImage: React.PropTypes.string,
  earthBumpImage: React.PropTypes.string,
  scrollRotate: React.PropTypes.bool,
};

export default GlobeComponent;
