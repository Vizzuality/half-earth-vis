import React from 'react';
import * as THREE from 'three';
import orbitControl from './control';
import Modal from '../Modal';
import customData from './assets/data.json';

import './style.scss';
import earthImage from './images/globe/1-clean.jpg';
import animaliaImage from './images/globe/animmalia-2-low.jpg';
import protectedImage from './images/globe/protected-areas-2-low.jpg';
import ecoImage from './images/globe/eco-regions-low.jpg';
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

    this.scene.add(this.camera);

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
        this.showmodal(userData.Places, userData.Description, userData.ID);
      }
    }.bind(this), false);
  }

  componentWillReceiveProps(nextProps) {
    // const interactive = document.querySelector('.c-interactive-world-section');
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

    const conditional = window.scrollY >= document.querySelector('.c-video-section').offsetTop;
    if (conditional) {
      if (!this.markersShow) {
        this.addMarkers();
      }
      this.markersShow = true;
    } else {
      this.removeMarkers();
      this.markersShow = false;
    }

    // if () {
    //   setTimeout(function(){
    //
    //   }, (27800));
    // } else {
    //
    // }
  }

  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = false;
    this.control.dampingFactor = 0;
    this.control.autoRotate = this.props.autorotate;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = 0.1;
    this.control.autoRotateSpeed = this.props.velocity;
  }

  goFirst() {
    document.querySelector('.back-stars').style.display = 'none';
    document.querySelector('.back-blue-two').style.opacity = '0';
    const mesh = document.querySelector('.c-mesh');
    const ranger = document.querySelector('.c-ranger-d3');
    const rangerAnim = document.querySelector('.c-ranger-d3-anim');
    const circles = document.querySelector('.c-line-circles');
    const containCirclesLines = document.querySelector('.c-line-circles');
    const containCirclesDark = document.querySelector('.c-circles-dark');
    document.querySelector('body').classList.remove('-stop-scrolling');
    window.scrollTo(0, 0);
    document.querySelector('.second-text-globe').style.display = 'none';
    document.querySelector('.contain-checks').style.display = 'none';
    document.querySelector('.explore-text').style.display = 'none';
    document.querySelector('.footer-text').style.display = 'none';
    document.querySelector('.c-icon-circle-up').style.display = 'none';
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x364047);
    this.directionalLight = new THREE.DirectionalLight(0x9aaab8, 1);
    this.directionalLight.position.set(this.props.width, this.props.height * 0.7, 0);
    this.scene.add(ambientLight);
    this.camera.add(this.directionalLight);
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

    document.querySelector('.eco-text').style.opacity = '0';
    document.querySelector('.protected-text').style.opacity = '0';
    document.querySelector('.animalia-text').style.opacity = '0';

    if (e.target.classList.contains('eco')) {
      document.querySelector('.eco-text').style.opacity = '1';
    } else if (e.target.classList.contains('protected')) {
      document.querySelector('.protected-text').style.opacity = '1';
    } else if (e.target.classList.contains('animalia')) {
      document.querySelector('.animalia-text').style.opacity = '1';
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
    document.querySelector('.c-modal').style.top = '50%';
    document.querySelector('.c-header').style.zIndex = '1';
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
    const material0 = new THREE.MeshBasicMaterial({ color: 0x1bcec7, side: THREE.DoubleSide, opacity: 0.5, transparent: true });
    const material = new THREE.MeshBasicMaterial({ color: 0x1bcec7, side: THREE.DoubleSide });
    const markers = [];
    const markerRadio = 3;
    const segments = 64;
    const height = 1;

    this.control.rotateSpeed = 0.5;

    for (let i = customData.length - 1; i >= 0; i--) {
      // calculate the position
      const lat = customData[i].Latitude;
      const lng = customData[i].Longtitude;
      const radio = this.props.radius;
      const position = latLongToVector3(lat, lng, radio, height + (i * 0.2));

      const geometry0 = new THREE.CircleGeometry(markerRadio + 5, segments);
      const marker0 = new THREE.Mesh(geometry0, material0);

      marker0.position.set(position.x, position.y, position.z);
      marker0.lookAt(new THREE.Vector3(0, 0, 0));
      marker0.rotateX(Math.PI);
      marker0.data = customData[i];

      const geometry = new THREE.CircleGeometry(markerRadio, segments);
      const marker = new THREE.Mesh(geometry, material);

      marker.position.set(position.x, position.y, position.z);
      marker.lookAt(new THREE.Vector3(0, 0, 0));
      marker.rotateX(Math.PI);
      marker.data = customData[i];

      markers.push(marker0);
      this.scene.add(marker0);

      markers.push(marker);
      this.scene.add(marker);
    }

    this.markers = markers;
  }

  /**
   * Removing markers from globe
   */
  removeMarkers() {
    this.control.rotateSpeed = 0.1;
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
    // this.directionalLight.position.copy({
    //   x: this.camera.position.x - 1000,
    //   y: this.camera.position.y - 1000,
    //   z: this.camera.position.z
    // });
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
        <div ref={(node) => this.el = node} className="vizz-component-globe z2">
          <div className="back-stars"></div>
            <svg
              className="c-icon-circle-up  -small"
              onClick={() => this.goFirst()}
            >
              <use xlinkHref="#icon-down-circle">{''}</use>
            </svg>
          <h1 className="title-section center first-text-globe">Can we save half<br />the earth<br />for the rest<br />of life{'?'}</h1>
          <h2 className="title-section center second-text-globe">We can if we want to</h2>
          <div className="contain-checks">
            <div className="label-contain">
              <input className="select-legend protected" id="protected" data-layer={protectedImage} type="checkbox" onChange={(e) => this.setTexture(e)}></input>
              <label htmlFor="protected">Protected Areas</label>
            </div>
            <span className="text-source protected-text">Source: <a href="https://www.protectedplanet.net/" target="_blank">Protected planet</a></span>

            <div className="label-contain">
              <input className="select-legend eco" id="eco" data-layer={ecoImage} type="checkbox" onChange={(e) => this.setTexture(e)}></input>
              <label htmlFor="eco">Eco-regions</label>
            </div>
            <span className="text-source eco-text">Source: <a href="http://www.ciesin.org/" target="_blank">CIESIN</a></span>

            <div className="label-contain">
              <input className="select-legend animalia" id="animalia" data-layer={animaliaImage} type="checkbox" onChange={(e) => this.setTexture(e)}></input>
              <label htmlFor="animalia">Animalia</label>
            </div>
            <span className="text-source animalia-text">Source: <a href="http://www.iucnredlist.org/" target="_blank">IUCN redlist</a></span>
          </div>
          <h3 className="explore-text">Explore the Best Places in the Biosphere</h3>
          <h4 className="footer-text">E.O. Wilson suggests these spots where Earth{"'"}s biodiversity<br />
          can still be reclaimed in his book Half-Earth: Our Planet{"'"}s Fight for Life
        </h4>
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
  radius: 205,
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
