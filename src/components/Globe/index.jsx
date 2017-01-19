import React from 'react';
import * as THREE from 'three';
import orbitControl from './control';
import Modal from '../Modal';
import customData from './assets/data.json';

import './style.scss';
import earthImage from './images/globe/1-clean.jpg';
import animaliaImage from './images/globe/animmalia-2.jpg';
import protectedImage from './images/globe/protected-areas-2.jpg';
import ecoImage from './images/globe/eco-regions.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import { latLongToVector3, addStats } from './utils';

const Control = orbitControl(THREE);

class GlobeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop,
      markers: false,
      modalImage: null,
      modalText: null,
      modalTitle: null
    };
  }

  componentDidMount() {
    this.state = {
      scrollTop: this.props.scrollTop,
      markers: false,
      texture: false
    };

    this.imageTexture = earthImage;
    this.markersShow = false;

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
          this.rotateX(1);
        } else {
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
        this.showmodal(userData.Region, userData.Description, userData.ID);
      }
    }.bind(this), false);
  }

  componentWillReceiveProps(nextProps) {
    const interactive = document.querySelector('.c-interactive-world-section');
    const galeryOne = document.querySelector('.c-gallery-one-section');
    const galeryTwo = document.querySelector('.c-gallery-two-section');
    this.setState(
      {
        scrollTop: nextProps.scrollTop
      }
    );
    const changeWorldOne = galeryOne.offsetTop < this.state.scrollTop;
    const changeWorldTwo = galeryTwo.offsetTop < this.state.scrollTop;


    if (changeWorldOne && !changeWorldTwo) {
      if (this.imageTexture === earthImage) {
        this.earth.material.map = this.imageLoader.load(protectedImage);
        this.imageTexture = protectedImage;
      }
    } else {
      if (this.imageTexture === protectedImage) {
        this.earth.material.map = this.imageLoader.load(earthImage);
        this.imageTexture = earthImage;
      }
    }

    if (changeWorldTwo) {
      if (this.imageTexture === protectedImage) {
        this.earth.material.map = this.imageLoader.load(earthImage);
        this.imageTexture = earthImage;
      }
      this.imageTexture = earthImage;
    }

    const conditional = interactive.offsetTop < this.state.scrollTop;
    if (conditional) {
      if (!this.markersShow) {
        this.addMarkers();
      }
      this.markersShow = true;
    } else {
      this.removeMarkers();
      this.markersShow = false;
    }
  }

  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = false;
    this.control.dampingFactor = 0;
    this.control.autoRotate = this.props.autorotate;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = this.props.velocity;
    this.control.autoRotateSpeed = this.props.velocity;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x222222);
    this.directionalLight = new THREE.PointLight(0xcfcfcf, 1);
    this.directionalLight.position.set(-this.props.width / 2, this.props.height / 2, 1500);
    // this.directionalLight.position.set(5, 3, 40);
    this.scene.add(ambientLight);
    this.scene.add(this.directionalLight);
  }

  addGlobe() {
    const material = new THREE.MeshPhongMaterial({
      map: this.imageLoader.load(this.props.earthImage),
      bumpMap: this.imageLoader.load(this.props.earthBumpImage),
      bumpScale: 4
    });
    const geometry = new THREE.SphereGeometry(this.props.radius, 40, 30);
    const earth = new THREE.Mesh(geometry, material);
    earth.updateMatrix();
    this.earth = earth;
    this.scene.add(earth);
  }

  setTexture(e) {
    let same = false;
    const target = e.target;
    if (e.target.classList.contains('-selected')) {
      same = true;
    }
    const checks = document.querySelectorAll('.select-legend');
    for (let i = 0; i < checks.length; i++) {
      checks[i].classList.remove('-selected');
    }
    if (!same) {
      target.classList.add('-selected');
      this.earth.material.map = this.imageLoader.load(target.getAttribute('data-layer'));
      this.imageTexture = target.getAttribute('data-layer');
    } else {
      this.earth.material.map = this.imageLoader.load(earthImage);
      this.imageTexture = earthImage;
    }
  }

  showmodal(title, description, id) {
    document.querySelector('.c-modal').style.top = '0';
    this.setState({
      modalText: description,
      modalImage: id,
      modalTitle: title
    });
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
    document.querySelector('.c-header').classList.remove('z4');
    const material = new THREE.MeshBasicMaterial({ color: 0x1bcec7, side: THREE.DoubleSide });
    const markers = [];
    const markerRadio = 5;
    const segments = 64;

    for (let i = customData.length - 1; i >= 0; i--) {
      // calculate the position
      const lat = customData[i].Latitude;
      const lng = customData[i].Longtitude;
      const radio = this.props.radius;
      const height = 5;
      const position = latLongToVector3(lat, lng, radio, height);

      const geometry = new THREE.CircleGeometry(markerRadio, segments);
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

  /**
   * Removing markers from globe
   */
  removeMarkers() {
    document.querySelector('.c-header').classList.add('z4');
    if (this.markers && this.markers.length) {
      for (var i = this.markers.length - 1; i >= 0; i--) {
        this.scene.remove(this.markers[i]);
      }
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
    // this.directionalLight.position.copy(this.camera.position);
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
        <div ref={(node) => this.el = node} className="vizz-component-globe z2">
          <div className="contain-checks">
            <div className="label-contain">
              <input className="select-legend" id="protected" data-layer={protectedImage} type="checkbox" onChange={(e) => this.setTexture(e)}></input>
              <label htmlFor="protected">Protected Areas</label>
            </div>
            <div className="label-contain">
              <input className="select-legend" id="eco" data-layer={ecoImage} type="checkbox" onChange={(e) => this.setTexture(e)}></input>
              <label htmlFor="eco">Eco-regions</label>
            </div>
            <div className="label-contain">
              <input className="select-legend" id="animalia" data-layer={animaliaImage} type="checkbox" onChange={(e) => this.setTexture(e)}></input>
              <label htmlFor="animalia">Animalia</label>
            </div>
          </div>
          <Modal
            image={this.state.modalImage}
            description={this.state.modalText}
            title={this.state.modalTitle}
          />
        </div>
    );
  }

}

GlobeComponent.defaultProps = {
  width: window.innerWidth,
  height: 500,
  radius: 226,
  autorotate: true,
  velocity: 0.25,
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
