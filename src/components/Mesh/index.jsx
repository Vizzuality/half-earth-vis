import * as d3 from 'd3';
import React from 'react';
import './style.scss';


class Mesh extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const minY = 1050;
    const maxY = 1680;
    this.setState({
      isActive: nextProps.scrollTop >= minY && nextProps.scrollTop <= maxY
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isActive) {
      this.createMesh();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isActive !== this.state.isActive;
  }

  createMesh() {
    let options = {};
    const defaults = {
      pointColor: 'rgba(79, 220, 253, 1)',
      lineColor: 'rgba(96, 157, 187, 1)'
    };
    this.options = Object.assign({}, defaults, options);
    options = this.options;
    const τ = Math.PI * 2;
    const width = this.props.width + 100;
    const height = this.props.height + 100;
    const canvas = d3.select(this.canvas)
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

        if ((dx * dx) + (dy * dy) < 10000) {
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
      .force('link', d3.forceLink().id(d => d.index))
      .force('charge', d3.forceManyBody().strength(-60))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('y', d3.forceY(0))
      .force('x', d3.forceX(0));

    simulation
      .nodes(nodes.slice())
      .on('tick', ticked);
  }

  render() {
    return (
      <div className="c-mesh z3" ref={ (el) => { this.el = el; } }>
        { this.state.isActive && <canvas ref={(canvas) => { this.canvas = canvas; }} /> }
      </div>
    );
  }

}

Mesh.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Mesh;
