import * as topojson from 'topojson-client';

import 'normalize.css';
import './styles/lib/foundation.css';
import './styles/index.scss';

import _ from 'underscore';

import World from './components/World/Canvas';
import Photo from './components/Photo';
import Delaunay from './components/Delaunay';
import Globe from './components/Globe';

import worldTopo from './data/world.json';
import elephantsPath from './images/elephants.jpg';
import deerPath from './images/deer.jpg';
import wilsonPath from './images/wilson.jpg';

const app = {};
const worldGeoJSON = topojson.feature(worldTopo, worldTopo.objects.land);

// DOM is ready
function onReady() {
  // Section 1
  app.world = new World('world', {
    geojson: worldGeoJSON
  });

  // Section 2

  // Section 3
  app.elephantPhoto = new Photo('elephantPhoto', {
    imagePath: elephantsPath
  });

  // Section 4

  // Section 5

  // Section 6
  app.deerPhoto = new Photo('deerPhoto', {
    imagePath: deerPath
  });

  // Section 7
  app.delaunay = new Delaunay('delaunay');

  // Section 9
  app.wilsonPhoto = new Photo('wilsonPhoto', {
    imagePath: wilsonPath
  });

  // Section 10
  app.globe = new Globe('#globe');

  function onScroll(ev) {
    const h = window.innerHeight;
    const y = window.pageYOffset;

    // Section 4: map in orthographic
    if (y < (h * 2)) {
      let introHeading = document.getElementById('intro-heading');
      introHeading.style.filter = `blur(${y / 20}px)`;

      let scrollAnimation = document.getElementById('scroll-down-animation');
      scrollAnimation.classList.add('-hidden');

      app.world.setProjection('robinson');
    } else if (y >= (h * 2) && y < (h * 8)) {
      app.world.setProjection('orthographic');
    } else {
      app.world.setProjection('robinson');
    }
  }

  window.addEventListener('scroll', onScroll);
}

document.addEventListener('DOMContentLoaded', onReady);