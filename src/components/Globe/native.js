import * as THREE from 'three';
import orbitControl from 'three-orbit-controls';
import earthImage from '../../images/earth.jpg';
import earthBumpImage from '../../images/earth-bump.jpg';

const Control = orbitControl(THREE);

const defaults = {
};

class Globe {

  constructor(queryElement, options = {}) {
    this.el = document.querySelector(queryElement);
    this.options = Object.assign({}, defaults, options);
    this.init();
  }

  init() {
    this.setSize();

    const width = this.options.width;
    const height = this.options.height;

    this.scene = new THREE.Scene();
    this.imageLoader = new THREE.TextureLoader();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setSize(this.options.width, this.options.height);
    this.el.appendChild(this.renderer.domElement);

    this.addControls();
    this.addLights();
    this.addGlobe();

    this.camera.position.z = 880;

    this.render();
  }

  setSize() {
    this.options.width = window.innerWidth;
    this.options.height = window.innerHeight;
  }

  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.control.dampingFactor = 0.1;
    this.control.autoRotate = true;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = 0.1;
    this.control.autoRotateSpeed = 0.3;
  }

  addGlobe() {
    const radius = 200;
    const material = new THREE.MeshPhongMaterial({
      map: this.imageLoader.load(earthImage),
      bumpMap: this.imageLoader.load(earthBumpImage),
      bumpScale: 2
    });
    const geometry = new THREE.SphereGeometry(radius, 40, 30);
    const earth = new THREE.Mesh(geometry, material);
    earth.rotation.y = Math.PI;
    earth.updateMatrix();

    this.scene.add(earth);
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 3, 40);
    this.scene.add(ambientLight);
    this.scene.add(this.directionalLight);
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.directionalLight.position.copy(this.camera.position);
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  pause() {
    this.controls.autorotate = false;
  }

  resume() {
    this.controls.autorotate = true;
  }

}

export default Globe;
