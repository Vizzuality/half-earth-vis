import _ from 'underscore';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import * as geo from 'd3-geo-projection';

const defaults = {
  space: 4.5,
  width: 500,
  height: 500,
  velocity: 100
};

class World {

  constructor(elementQuery, options = {}) {
    this.el = d3.select(elementQuery);
    this.options = Object.assign({}, defaults, options);
    this.init();
  }

  init() {
    this.svg = this.el.append('svg');

    this.setSize();

    fetch('/data/world.json')
      .then(response => response.json())
      .then((topo) => {
        this.data = topojson.feature(topo, topo.objects.land);
        this.drawRobinson();
      });

    // Resizing
    window.addEventListener('resize', _.debounce(this.update.bind(this), 200));
  }

  setSize() {
    // Lookup the size the browser is displaying the svg.
    const displayWidth = this.options.width = window.innerWidth;
    const displayHeight = this.options.height = window.innerHeight;

    // Check if the svg is not the same size.
    if (this.svg.attr('width') !== displayWidth ||
      this.svg.attr('height') !== displayHeight) {
      // Make the svg the same size
      this.svg
        .attr('width', displayWidth)
        .attr('height', displayHeight);
    }
  }

  drawRobinson() {
    if (!this.data) {
      throw new Error('this.data should be defined');
    }

    const projection = geo.geoRobinson()
      .translate([this.options.width / 2, this.options.height / 2]);

    this.path = d3.geoPath().projection(projection);
    this.map = this.svg.append('g')
        .attr('id', 'mapMask')
      .insert('path')
        .datum(this.data)
      .attr('class', 'world')
      .attr('d', this.path);

    this.fitBounds();
    this.drawPattern();
  }

  fitBounds() {
    const bounds = this.path.bounds(this.data);
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 1 / ((bounds[1][1] - bounds[0][1]) / this.options.height);
    const translate = [
      (this.options.width / 2) - (scale * x),
      (this.options.height / 2) - (scale * y)
    ];

    this.map.attr('transform', `translate(${translate})scale(${scale})`);
  }

  drawPattern() {
    const total = Math.ceil(this.diagonalCalc() / (2 * this.options.space));
    const centerPoint = [(this.options.width / 2), (this.options.height / 2)];
    const circlesData = [];

    for (let i = total; i >= 0; i -= 1) {
      circlesData.push({
        xaxis: centerPoint[0],
        yaxis: centerPoint[1],
        radius: this.options.space * i
      });
    }

    this.svg.selectAll('circle.circle-pattern').remove();

    const circlesGroup = this.svg.append('g')
      .attr('class', 'pattern');

    circlesGroup.selectAll('circle')
        .data(circlesData)
        .enter()
      .append('circle')
        .attr('class', 'circle-pattern')
        .attr('cx', d => d.xaxis)
        .attr('cy', d => d.yaxis)
        .attr('r', d => d.radius);

    // // Applying map mask to pattern
    circlesGroup.attr('clip-path', 'url(#mapMask)');
  }

  diagonalCalc() {
    const width = this.options.width;
    const height = this.options.height;
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  }

  update() {
    this.setSize();
    this.fitBounds();
    this.drawPattern();
  }

}

export default World;
