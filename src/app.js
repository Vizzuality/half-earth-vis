import * as topojson from 'topojson-client';

import 'normalize.css';
import './styles/lib/foundation.css';
import './styles/index.scss';

import World from './components/World/Canvas';
import Photo from './components/Photo';
import Delaunay from './components/Delaunay';

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
  app.worldIntro2 = new World('worldIntro2', {
    geojson: worldGeoJSON
  });

  // Section 3
  app.elephantPhoto = new Photo('elephantPhoto', {
    imagePath: elephantsPath
  });

  // Section 4
  app.worldLayer = new World('worldLayer', {
    geojson: worldGeoJSON,
    projection: 'orthographic',
  });

  // Section 5
  app.worldLayer2 = new World('worldLayer2', {
    geojson: worldGeoJSON,
    projection: 'orthographic',
  });

  // Section 6
  app.deerPhoto = new Photo('deerPhoto', {
    imagePath: deerPath
  });

  // Section 7
  app.worldVis = new World('worldVis', {
    projection: 'orthographic',
    geojson: worldGeoJSON,
    resize: false,
    width: window.innerHeight * 0.7,
    height: window.innerHeight * 0.7
  });
  app.delaunay = new Delaunay('delaunay');

  app.worldVis2 = new World('worldVis2', {
    projection: 'orthographic',
    geojson: worldGeoJSON,
    resize: false,
    width: window.innerHeight * 0.7,
    height: window.innerHeight * 0.7
  });

  // Section 9
  app.wilsonPhoto = new Photo('wilsonPhoto', {
    imagePath: wilsonPath
  });
}

document.addEventListener('DOMContentLoaded', onReady);
