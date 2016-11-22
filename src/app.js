import * as topojson from 'topojson-client';

import 'normalize.css';
import './styles/index.scss';

import World from './components/World/Canvas';
import Photo from './components/Photo';

import worldTopo from './data/world.json';
import elephantsPath from './images/elephants.jpg';
import deerPath from './images/deer.jpg';
import wilsonPath from './images/wilson.jpg';

const app = {};
const worldGeoJSON = topojson.feature(worldTopo, worldTopo.objects.land);

// DOM is ready
function onReady() {
  // Section 1
  app.worldIntro = new World('worldIntro', {
    geojson: worldGeoJSON
  });

  // Section 2
  app.elephantPhoto = new Photo('elephantPhoto', {
    imagePath: elephantsPath
  });

  // Section 3
  app.worldLayer = new World('worldLayer', {
    geojson: worldGeoJSON
  });

  // Section 4
  app.deerPhoto = new Photo('deerPhoto', {
    imagePath: deerPath
  });

  // Section 3
  app.worldVis = new World('worldVis', {
    projection: 'orthographic',
    geojson: worldGeoJSON
  });

  // Section 5
  app.wilsonPhoto = new Photo('wilsonPhoto', {
    imagePath: wilsonPath
  });
}

document.addEventListener('DOMContentLoaded', onReady);
