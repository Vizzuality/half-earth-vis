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
    this.addMarkers();

    this.draw();

    // Adding frame stats for development
    if (config.env === 'development') {
      addStats();
    }

    // On scroll event
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

    // On click event
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    document.addEventListener('click', function(event) {
      event.preventDefault();

      mouse.x = (event.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (event.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;

      this.camera.updateMatrixWorld();
      raycaster.setFromCamera( mouse, this.camera );

      const intersects = raycaster.intersectObjects( this.scene.children );

      if (intersects && intersects.length > 1) {
        const userData = intersects[0].object.data;
        this.showmodal(userData.Region, userData.Description);
      }
    }.bind(this), false);
  }

  componentWillReceiveProps(nextProps) {
    const interactive = document.querySelector('.c-interactive-world-section');
    this.setState(
      {
        scrollTop: nextProps.scrollTop
      }
    );
    // const conditional = interactive.offsetTop < this.state.scrollTop;
    // if (conditional) {
    //   this.addMarkers();
    // } else {
    //   this.removeMarkers();
    // }
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

  setTexture(e) {
    const value = e.target.value;
    if (value === 'one') {
      this.earth.material.needsUpdate = this.imageLoader.load('src/images/earth-clouds.jpg');
    }
    if (value === 'two') {
      this.earth.material.needsUpdate = this.imageLoader.load('src/images/bg-stars-large.jpg');
    }
    // this.earth.material.needsUpdate = this.imageLoader.load(imagePath);
  }

  showmodal(title, description) {
    document.querySelector('.c-modal').style.top = '0';
    document.querySelector('.title-modal').innerHTML = title;
    document.querySelector('.description-modal').style.left = description;
  }

  /**
   * Rotate globe to given angle in X axis
   * @param  {Number} angle
   */
  rotateX(angle) {
    this.control.customRotate(angle);
  }

  /**
   * Method to add markers on globe
   */
  addMarkers() {
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const markers = [];

    for (let i = customData.length - 1; i >= 0; i--) {
      // calculate the position
      const lat = customData[i].Latitude;
      const lng = customData[i].Longtitude;
      const radio = this.props.radius;
      const height = 6;
      const position = latLongToVector3(lat, lng, radio, height);

      const geometry = new THREE.PlaneGeometry(14, 20);
      const marker = new THREE.Mesh(geometry, material);

      marker.position.set(position.x, position.y, position.z);
      marker.lookAt(new THREE.Vector3(0, 0, 0));
      marker.rotateX(Math.PI);
      marker.data = customData[i];

      markers.push(marker);
      this.scene.add(marker);
    }

    this.markers = markers;
  }

  removeMarkers() {
    if (this.markers && this.markers.length) {
      // Remove markers
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

  getInfoModal() {
    return customData.map((data) => {
      return {
        id: data.ID,
        region: data.Region,
        place: data.Places,
        description: data.Description
      };
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
        <div ref={(node) => this.el = node} className="vizz-component-globe z2">
          <select onChange={(e) => this.setTexture(e)}>
            <option value="one">one</option>
            <option value="two">two</option>
          </select>
        </div>
    );
  }

}

GlobeComponent.defaultProps = {
  width: window.innerWidth,
  height: 500,
  radius: 200,
  autorotate: true,
  velocity: 0.05,
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
