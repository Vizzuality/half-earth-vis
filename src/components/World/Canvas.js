import _ from 'underscore';
import * as d3 from 'd3';
import * as geo from 'd3-geo-projection';

const defaults = {
  patternColor: '#000',
  projection: 'robinson',
  lineWidth: 2,
  space: 4.5,
  width: 500,
  height: 500,
  resize: true,
  geojson: {}
};

const geoProjection = {
  robinson: geo.geoRobinson,
  orthographic: d3.geoOrthographic
};

class World {

  constructor(elementQuery, options = {}) {
    this.el = document.getElementById(elementQuery);
    this.options = Object.assign({}, defaults, options);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    this.setSize();
    this.data = this.options.geojson;
    this.draw();

    // Resizing
    window.addEventListener('resize', _.debounce(this.update.bind(this), 200));
  }

  setSize() {
    if (this.options.resize) {
      // Lookup the size the browser is displaying the canvas.
      const displayWidth = this.options.width = window.innerWidth;
      const displayHeight = this.options.height = window.innerHeight;

      // Check if the canvas is not the same size.
      if (this.canvas.width !== displayWidth ||
        this.canvas.height !== displayHeight) {
        // Make the canvas the same size
        this.canvas.width = displayWidth;
        this.canvas.height = displayHeight;
      }
    } else {
      this.canvas.width = this.options.width;
      this.canvas.height = this.options.height;
    }
  }

  draw() {
    const translate = [this.options.width / 2, this.options.height / 2];
    const projectionFn = geoProjection[this.options.projection];

    // Calculating bounds and scale
    const projectionHelper = projectionFn().translate(translate).scale(1);
    const bounds = d3.geoPath().projection(projectionHelper).bounds(this.data);
    const scale = this.getScale(bounds);

    // Creating projection
    const projection = projectionFn().translate(translate).scale(scale);
    const path = d3.geoPath().projection(projection).context(this.context);

    // Clear canvas before draw
    this.clear();

    // Drawing path
    this.context.save();
    this.context.beginPath();
    path(this.data);
    this.context.closePath();
    this.context.clip();
    this.paintPattern();
    this.context.restore();

    // Draw image
    const imagePath = this.canvas.toDataURL();
    this.el.style.backgroundImage = `url(${imagePath})`;
  }

  getScale(bounds) {
    return Math.ceil(1 / ((bounds[1][1] - bounds[0][1]) / this.options.height));
  }

  paintPattern() {
    const total = Math.ceil(this.diagonalCalc() / (2 * this.options.space));
    const center = [(this.options.width / 2), (this.options.height / 2)];

    this.context.lineWidth = this.options.lineWidth;
    this.context.strokeStyle = this.options.patternColor;

    for (let i = 1; i < total; i = 1 + i) {
      const r = this.options.space * i;
      this.context.beginPath();
      this.context.arc(center[0], center[1], r, 0, Math.PI * 2, false);
      this.context.stroke();
      this.context.closePath();
    }
  }

  diagonalCalc() {
    const width = this.options.width;
    const height = this.options.height;
    const x2 = Math.pow(width, 2);
    const y2 = Math.pow(height, 2);
    return Math.ceil(Math.sqrt(x2 + y2)); // Pitaghoras :)
  }

  update() {
    this.setSize();
    this.draw();
  }

  clear() {
    this.context.clearRect(0, 0, this.options.width, this.options.height);
  }

  setProjection(projectionName) {
    this.options.projection = projectionName;
    this.draw();
  }

}

export default World;
