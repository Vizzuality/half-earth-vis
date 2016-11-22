import * as d3 from 'd3';

const defaults = {
  pointColor: 'rgb(99, 204, 48)',
  lineColor: 'rgba(99, 204, 48, .3)'
};

class Delaunay {

  constructor(elementQuery, options = {}) {
    this.el = d3.select(`#${elementQuery}`);
    this.options = Object.assign({}, defaults, options);
    this.init();
  }

  init() {
    const options = this.options;
    const τ = Math.PI * 2;
    const width = Math.ceil(window.innerHeight * 0.75);
    const height = width;
    const canvas = this.el.append('canvas')
      .attr('width', width)
      .attr('height', height);
    const context = canvas.node().getContext('2d');
    const nodes = d3.range(200).map(() => {
      return {
        x: Math.random() * width,
        y: Math.random() * height
      };
    });
    const voronoi = d3.voronoi()
      .x(d => d.x)
      .y(d => d.y);

    function ticked() {
      const links = voronoi.links(nodes);

      // Draw
      context.clearRect(0, 0, width, height);
      context.beginPath();

      for (let i = links.length - 1; i >= 0; i--) {
        const link = links[i];
        const dx = link.source.x - link.target.x;
        const dy = link.source.y - link.target.y;

        if (dx * dx + dy * dy < 10000) {
          context.moveTo(link.source.x, link.source.y);
          context.lineTo(link.target.x, link.target.y);
        }
      }

      context.lineWidth = 1;
      context.strokeStyle = options.lineColor;
      context.stroke();

      context.beginPath();
      for (let j = 0, n = nodes.length; j < n; ++j) {
        const node = nodes[j];
        context.moveTo(node.x, node.y);
        context.arc(node.x, node.y, 4, 0, τ);
      }
      context.fillStyle = options.pointColor;
      context.fill();
    }

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function(d) { return d.index }))
      .force('charge', d3.forceManyBody().strength(function(d, i) {
        return -50;
      }))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('y', d3.forceY(0))
      .force('x', d3.forceX(0));

    simulation
      .nodes(nodes.slice())
      .on('tick', ticked);
  }

}

export default Delaunay;
