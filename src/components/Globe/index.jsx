import React from 'react';
import * as THREE from 'three';
import orbitControl from 'three-orbit-controls';
import THREEX from 'threex.domevents';

import './style.scss';
import earthImage from './images/earth-clouds.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import { latLongToVector3, addStats } from './utils';

const Control = orbitControl(THREE);

class GlobeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop
    };
  }

  componentDidMount() {
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
  }

  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.control.dampingFactor = 0.1;
    this.control.autoRotate = this.props.autorotate;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = this.props.velocity;
    this.control.autoRotateSpeed = this.props.velocity;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 3, 40);
    this.scene.add(ambientLight);
    this.scene.add(this.directionalLight);
  }

  addGlobe() {
    const material = new THREE.MeshPhongMaterial({
      map: this.imageLoader.load(this.props.earthImage),
      bumpMap: this.imageLoader.load(this.props.earthBumpImage),
      bumpScale: 2
    });
    const geometry = new THREE.SphereGeometry(this.props.radius, 40, 30);
    const earth = new THREE.Mesh(geometry, material);

    earth.updateMatrix();

    this.scene.add(earth);
  }

  loadJSON(file, callback) {

    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

  load() {
    this.loadJSON('src/components/Globe/assets/data.json', function(response) {
      const actual_JSON = JSON.parse(response);
      console.log(actual_JSON );
      return actual_JSON;
    });
  }

  addMarkers() {

    this.load();
    // console.log(val);

    const data = [
      {
        "ID": 1,
        "Region": "North America",
        "Places": "The Redwood Forests of California",
        "Latitude": 41.213179,
        "Longtitude": -124.004628,
        "Description": "In effect, mature redwood forests have created a new and mostly unexplored layer of life, within which exist species rare or absent elsewhere.",
        "": ""
      },
      {
        "ID": 2,
        "Region": "North America",
        "Places": "The Longleaf Pine Savanna of the Southeastern United States",
        "Latitude": 31.070877,
        "Longtitude": -86.629149,
        "Description": "Once the dominant tree of 60 percent of the land from Carolinas to eastern Texas, the longleaf savanna vegetation is adapted to frequent lightning-struck ground fires. The ground flora is one of the richest in North America, with as many as fifty herbaceous and shrubby pecies in a single hectare.",
        "": ""
      },
      {
        "ID": 3,
        "Region": "North America",
        "Places": "The Madrean Pine-Oak Woodlands in Mexico and the Southwestern United States",
        "Latitude": 31.820146,
        "Longtitude": -109.272639,
        "Description": "One-fourth of Mexico's native species occur in these ancient woodlands; many are found nowhere else. Pine Forests in Michoacán are the famous wintering place of the monarch butterflies from the United States",
        "": ""
      },
      {
        "ID": 4,
        "Region": "West Indies",
        "Places": "Cuba and Hispaniola",
        "Latitude": 23.13302,
        "Longtitude": -82.38304,
        "Description": "The two largest islands of the Greater Antilles contain an exuberant fauna and flora that form the bulk of the biodiversity of all the West Indies.",
        "": ""
      },
      {
        "ID": 5,
        "Region": "South and Central America",
        "Places": "The Amazon River Basin",
        "Latitude": -2.163106,
        "Longtitude": -55.126648,
        "Description": "This endless world of ecosystems, the largest drainage system in the world, also contains the greatest area of rain forest and the most biodiverse surrounding savannas. It feeds fifteen thousand primary and secondary tributaries of the Amazon River and covers seven and a half million square kilometers, 40 percent of the area of the continent. Its biodiversity, if its Andean headwaters are included, is the largest in the world.",
        "": ""
      },
      {
        "ID": 6,
        "Region": "South and Central America",
        "Places": "The Guiana Shield of Guyana, Suriname, and French Guiana",
        "Latitude": 5.14333,
        "Longtitude": -60.7625,
        "Description": "The small countries of Guyana and Suriname, with neighboring French Guiana, are still 70 to 90 percent covered by pristine Amazon-related but distinctive rain forests. Their faunas and floras are exceptionally rich and remain among the least explored in the world.",
        "": ""
      },
      {
        "ID": 7,
        "Region": "South and Central America",
        "Places": "The Tepuis of Venezuela and Guyana",
        "Latitude": 5.3,
        "Longtitude": -62.166667,
        "Description": "These tableop mountains are the imagined \"lost worlds\" of H.G. Wells and Hollywood. Limited to Venezuela and western Guyana, they are composed of blocks of ancient quartz arenite sandstone thrust skyward from the surrounding rain forest. Their more or less flat tops in elevation from one thousand to three thousand meters. They are indeed worlds unto themselves, with weather radically different from that at lower elevations, spectacular rock formations, and waterfalls (Angel Falls is the highest in the world), and floras and faunas different from the lowlands below and from one tepui to the next.",
        "": ""
      },
      {
        "ID": 8,
        "Region": "South and Central America",
        "Places": "The Greater Manú Region of Peru",
        "Latitude": -11.85639,
        "Longtitude": -71.72139,
        "Description": "North of the river exists the most concentrated biodiversity on Earth, including a full array of New World larger mammals. A simple square kilometer can harbor the same number of species of frogs found in the entire continental United States, and twice the number of birds and butterflies.",
        "": ""
      },
      {
        "ID": 9,
        "Region": "South and Central America",
        "Places": "The Cloud and Summit Forests of Central America and the Northern Andes",
        "Latitude": -0.0511917,
        "Longtitude": -78.7783028,
        "Description": "These cool, rain-soaked environments are distinct in both climate, and biodiversity from the lowland forests below. Many are poorly explored, and contain large numbers of still-unknown species.",
        "": ""
      },
      {
        "ID": 10,
        "Region": "South and Central America",
        "Places": "The Páramos of South America",
        "Latitude": 9.00728,
        "Longtitude": -70.62538,
        "Description": "These high-elevation (2,800 to 4,700 meters) grasslands if South America contain many unique grasses, herbs, and woody bushes. They also stand out in their high rate of evolution of new species-possibly due to fluctuations of climate in the fragmented mountaintop environment.",
        "": ""
      },
      {
        "ID": 11,
        "Region": "South and Central America",
        "Places": "The Atlantic Forests of South America",
        "Latitude": -16.499999,
        "Longtitude": -39.249999,
        "Description": "Within their domains occur a wide variety of rare and unusual animals, including, as described by Mark Moffett, 'the most primitive porcupine; dancing frog ans fruit-eating frog; the Alagoas curassow, the few remaining specimens of which roam the private properties of two bird lovers; the largest New World primate, the muriqui; the most colorful of all primates, the golden lion tamarin; the golden lancehead viper of Queimada Grande Island, where it reaches the highest density known for any snake (not surprisingly, no person lives on 'snake island')'.",
        "": ""
      },
      {
        "ID": 12,
        "Region": "South and Central America",
        "Places": "The Cerrado",
        "Latitude": -23.75436,
        "Longtitude": -50.71332,
        "Description": "Covering a large part of east-central Brazil, the Cerrado is the largest savanna in South America and the most biodiversity-rich of any such tropical habitat in the world.",
        "": ""
      },
      {
        "ID": 13,
        "Region": "South and Central America",
        "Places": "The Pantanal",
        "Latitude": -16.75844,
        "Longtitude": -56.87682,
        "Description": "One of Earth's largest wetlands, mostly in southern Brazil but extending into Bolivia, this magnificent flood-plain is 80 percent underwater in the rainy season and is the year-round home to an immense variety of waterbird and insect life, as well as jaguars, capybaras, and other charismatic large mammals, including especially abundant crocodile-like caimans.",
        "": ""
      },
      {
        "ID": 14,
        "Region": "South and Central America",
        "Places": "The Galápagos",
        "Latitude": -0.777259,
        "Longtitude": -91.142578,
        "Description": "Giant tortoises, marine iguanas, herbs of the sunflower family that transmuted into trees, finches evolved from a single ancestor to fill a half-dozen bird niches, and more, make the islands both a laboratory and a classroom of evolutionary biology",
        "": ""
      },
      {
        "ID": 15,
        "Region": "Europe",
        "Places": "Białowieża Forest of Poland and Belarus",
        "Latitude": 52.7,
        "Longtitude": 23.86667,
        "Description": "A large fraction of the large mammals of Europe live within its confines, including most notably the European bison (which more than once has narrowly escaped extinction), roe deer, elk, wild boar, tarpan (a Polish wild forest horse), lynx, wolf, otter, and ermine. The nine hundred vascular plant species present include some of the largest oaks ever recorded.",
        "": ""
      },
      {
        "ID": 16,
        "Region": "Europe",
        "Places": "Lake Baikal of Russian Siberia",
        "Latitude": 53.1736,
        "Longtitude": 107.6625,
        "Description": "With an area of 31,722 square kilometers and a maximum depth of 1,642 meters, Lake Baikal is the oldest and deepest freshwater lake in the world. As espected from its volume, it also harbors a remarkably large fauna and flora for an isolated body in the high latitudes.",
        "": ""
      },
      {
        "ID": 17,
        "Region": "Africa and Madagascar",
        "Places": "The Christian Orthodox Church Forest of Ethiopia",
        "Latitude": 11.918979,
        "Longtitude": 37.94342,
        "Description": "Less than 5 percent of the native forests of northern Ethiopia remain, and they are virtually all limited to properties of the Chruch-conspicuous from the air as green patches sprinkled across the brown landscape of subsistence agriculture.",
        "": ""
      },
      {
        "ID": 18,
        "Region": "Africa and Madagascar",
        "Places": "Socotra",
        "Latitude": 12.46342,
        "Longtitude": 53.823738,
        "Description": "An isolated island (with small satellites) located in the Indian Ocean 352 kilometers south of Yemen, Socotra is populated by trees and shrubs so strange in shape and foliage as to earn it the title \"another Galápagos\" and \"most alien-looking place on Earth.\" Here you will find the dragon's blood tree, the wall-dwelling Socotran fig, toothed aloes, and other plant species hard to compare even in general form with vegetation elsewhere.",
        "": ""
      },
      {
        "ID": 19,
        "Region": "Africa and Madagascar",
        "Places": "The Serengeti Grassland Ecosystem",
        "Latitude": -2.394322,
        "Longtitude": 34.694824,
        "Description": "Arguably the most famous terrestrial wildland ecosystem in the world is the great Serengeti (which means, in the Maasai language, \"endless plains\"), spanning the vast area from northern Tanzania to southwestern Kenya. A substantial portion of its area, as well as that of Kenya, is protected by national parks, conservation areas, and game reserves. The faunas and floras, including especially the large mammals, are the closest we have to the originals that have populated the AFrican tropical grasslands and savannas since Pleistocene times.",
        "": ""
      },
      {
        "ID": 20,
        "Region": "Africa and Madagascar",
        "Places": "Gorongosa National Park, Mozambique",
        "Latitude": -18.826527,
        "Longtitude": 34.511061,
        "Description": "The country's premier reserve has a full representation of southeastern African biodiversity due to the mutlifarious habitats found within it, including a mountain ridge rising to almost two thousand meters, and topped by rain forest, miombo dry forest, multiple rivers and streams, gorges with bottoms covered in rain forest and flanked by limestone cliffs, the latter riddled with mostly unexplored caves.",
        "": ""
      },
      {
        "ID": 21,
        "Region": "Africa and Madagascar",
        "Places": "South Africa",
        "Latitude": -33.918861,
        "Longtitude": 18.4233,
        "Description": "The country as a whole contains within its borders one of the world's several most abounding and distinctive assemblages of both animals and plants.",
        "": ""
      },
      {
        "ID": 22,
        "Region": "Africa and Madagascar",
        "Places": "Forest of the Congo Basin",
        "Latitude": 0,
        "Longtitude": 22,
        "Description": "It is invested by tropical rain forest, constituting one of the world's three great rain forest wildernesses (the other two are the Amazon and New Guinea). Although under heavy siege from logging and conversion to agriculture, it remains home to more than three thousand unique plants and an immense fauna, including gorillas, okapi, forest elephants, and other famously spectacular species of large animals.",
        "": ""
      },
      {
        "ID": 23,
        "Region": "Africa and Madagascar",
        "Places": "The Atewa Forests of Ghana",
        "Latitude": 6.166667,
        "Longtitude": -0.6,
        "Description": "Many of the moist forests of Africa's western hump have been reduced drastically by human encroachment, but fragments still survive as islands that preserve parts of the once exceptionally rich flora and forest. A splendid example is the pristine Atewa Forest, at least ten and a half million years old, a remnant of the rain forest that has elsewhere been 80 percent removed.",
        "": ""
      },
      {
        "ID": 24,
        "Region": "Africa and Madagascar",
        "Places": "Madagascar",
        "Latitude": -19.756364,
        "Longtitude": 48.109131,
        "Description": "Being very big, ancient, and tropical, Madagascar harbors a very large and unique fauna and flora, with 70 percent or more of its species found nowhere else…Examples of evolutionary radiation in Madagascar's animals are the may, yet closely related, species of lemurs (primitive primates), chameleons, vangid shrikes, ranid frogs, and among the twelve thousand species of plants, complex palms, orchids, baobabs, and cactus-like Didiereaceae.",
        "": ""
      },
      {
        "ID": 25,
        "Region": "Asia",
        "Places": "The Altai Mountains",
        "Latitude": 45,
        "Longtitude": 99,
        "Description": "Covered at different elevations variously by steppes, nothern coniferous forests, and high alpine vegetation, it contains a living encyclopedia of cold temperate and arctic mammals, and is one of the few places in all of Eurasia that harbors a true Ice Age fauna.Herbivores abounding its slopes include wapiti, moose, reindeer, Siberian musk deer, roe deer, and wild boar. Among their predators are brown bears, wolves, lynx, snow leopards, and wolverines.",
        "": ""
      },
      {
        "ID": 26,
        "Region": "Asia",
        "Places": "Borneo",
        "Latitude": -2.460181,
        "Longtitude": 113.730469,
        "Description": "The island as a whole has lost a substantial fraction of its rain forest due to settlement and conversion to oil palm plantations. The damage has been what Science reported in 2007: 'Palm oil plantations are spreading sales of the biofuel soar, invasive acacia trees are on a rampage, and wildfires ravage the island each year.' Yet the interior of the great island, the 'Heart of Borneo,' remains the leading single harbor of Asia's tropical biodiversity.",
        "": ""
      },
      {
        "ID": 27,
        "Region": "Asia",
        "Places": "The Western Ghats of India",
        "Latitude": 12.753954,
        "Longtitude": 75.644084,
        "Description": "The Western Ghats, a mountain range running parallel to the full length of the west coast, are the geological spine of India. Their range of elevation, from near sea level to 2695 meters at the highest point, and their tropical location combine to create a great variety of terrestiral habitats, and with them a high level of biodiversity. Native to the mostly rolling, forested hills are five thousand species of plants, of which seventeen hundred are endemic, and a major mammal fauna that includes the world's largest population of wild Asian elephants and a tenth of Earth's survivng tigers.",
        "": ""
      },
      {
        "ID": 28,
        "Region": "Asia",
        "Places": "Bhutan",
        "Latitude": 27.724867,
        "Longtitude": 89.634705,
        "Description": "This idyllic mountain nation deserves praise for the preservation of much of its native habitats and biodiversity. Its faunas and floras remain an intact slce of those tht originally characterized the bulk of the Himalayan mountains and foothills. In Bhutan, 70 percent of the land is covered by forest representing the three principal zones, tropical, temperate, and alpine. The five thousand known species of plants include forty-sex rhododendrons and six hundred orchids.",
        "": ""
      },
      {
        "ID": 29,
        "Region": "Asia",
        "Places": "Myanmar",
        "Latitude": 18.364953,
        "Longtitude": 96.094666,
        "Description": "The northern reaches of this still-seldom-visited country harbor four reserves, about thirty-one thousand square kilometers in combined area, and a rich fauna that includes elephants, bears, red pandas, tigers, and gibbons. This region includes tropical forests, coniferous woodland, and even patches of arctic grasslands above tree line.",
        "": ""
      },
      {
        "ID": 30,
        "Region": "Australia and Melanesia",
        "Places": "Scrublands of Southwestern Australia",
        "Latitude": -30.829036,
        "Longtitude": 131.262553,
        "Description": "Possessing a mild, Mediterranean-type clomate and molybdenum-deficient soil that excludes species other than those adapted to the deficiency, the scrublands have evloved much like the flora of an oceanic island.",
        "": ""
      },
      {
        "ID": 31,
        "Region": "Australia and Melanesia",
        "Places": "The Kimberley Region of Northwestern Australia",
        "Latitude": -17.579291,
        "Longtitude": 125.220951,
        "Description": "The national parks and other, remote areas of this part of the continent are among the most biologically diverse and least disturbed regions.Experiencing a comeback in its unique but elsewhere endangered marsupial fauna, Kimberley is correcty called Australia's 'last great wilderness.'",
        "": ""
      },
      {
        "ID": 32,
        "Region": "Australia and Melanesia",
        "Places": "The Gibber Plains",
        "Latitude": -30.480119705,
        "Longtitude": 139.183273315,
        "Description": "The flat overflow lands of Sturt Stony Desert, located within the ultra-dry center of the continent, hold water only in the form of floods that occur many years apart. Abounding life emerges from dormancy at that time, drawing large flocks of waterbirds from far away. In between the errant rains the land is baked bone-dry, with knee-high sclerophyllous vegetation. Even when severe, it nevertheless teems with mostly hidden animal species.",
        "": ""
      },
      {
        "ID": 33,
        "Region": "Australia and Melanesia",
        "Places": "New Guinea",
        "Latitude": -7.293001,
        "Longtitude": 146.63744,
        "Description": "The world's second largest island (after Greenland), about eight hundred thousand square kilometers in area, is still mostly invested in rainf forest, wetlands, and upland grasslands. Its terrestiral biodiversity is generally recognized as both the richest and least explored in the world. The hyperdiversity is enhanced by the complex array of mountains ranges, the tallest soaring to alpine zones above forty-seven hundred meters, where occur permanently ice-covered peaks.",
        "": ""
      },
      {
        "ID": 34,
        "Region": "Australia and Melanesia",
        "Places": "New Caledonia",
        "Latitude": -22.27631,
        "Longtitude": 166.4572,
        "Description": "Today more than 80 percent of the native plant and animal species are found nowhere else, and many are markedly different from anything found elsewhere. New Caledonia even harbors elements that were present before it departed the Australia-plus-Antarctica landmass.It has the highest number of endemic families of plants, including those with archaic features, most famously Amborella, the most primitice flowering plant known on Earth.",
        "": ""
      },
      {
        "ID": 35,
        "Region": "Antarctica",
        "Places": "Mcmurdo Dry Valleys",
        "Latitude": -77.5,
        "Longtitude": 162,
        "Description": "Here, in the most inhospitable ice-free land on Earth, a place rivaled in the poverty of its biodiversity only by the sere, rainless Atacama Desert of Chile, live just enough species to make a balanced ecosystem. Sparse traces of algae are the plants, and several species of nematodes, also commonly called roundworms, are the variously herbivores and predators- what Diana Wall of Colorado State University calls the 'elephants and tigers' of the Anatarctic soil. The simplicity of the material and energy cycle remind us that there exist organisms able to establish themselves almost anywhere. But as humanity scales down Earth's ecosystems, life will become progressively less interesting and more difficult to turninto a support system.",
        "": ""
      },
      {
        "ID": 36,
        "Region": "Polynesia",
        "Places": "Hawaii",
        "Latitude": 19.298183,
        "Longtitude": -155.624084,
        "Description": "Its tropical climate, relativelt large size, and mountainous terrain with multitudinous habitats promoted the genesis of a large diversity of land-dwelling plants and animals.",
        "": ""
      }
    ]
;
    const geom = new THREE.Geometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    let material2 = '';
    const imageData = 'data:image/png;base64,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';
    const texture = THREE.ImageUtils.loadTexture(imageData);
    material2 = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, alphaTest: 0, transparent: true });

    for (let i = data.length - 1; i >= 0; i--) {
      // calculate the position
      const lat = data[i].Latitude;
      const lng = data[i].Longtitude;
      const radio = this.props.radius;
      const height = 6;
      const position = latLongToVector3(lat, lng, radio, height);

      // console.log(material);

      const geometry = new THREE.PlaneGeometry(14, 20);
      const marker = new THREE.Mesh(geometry, material2);

      marker.position.set(position.x, position.y, position.z);
      marker.rotateY((-Math.PI / 2) + lng);
      marker.addEventListener("click", function(){ alert("Hello World!"); });

      geom.mergeMesh(marker);
    }

    // create a new mesh, containing all the other meshes.
    const total = new THREE.Mesh(geom, material2);

    // and add the total mesh to the scene
    this.scene.add(total);
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.directionalLight.position.copy(this.camera.position);
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div ref={(node) => this.el = node} className="vizz-component-globe z2">{''}</div>
    );
  }

}

GlobeComponent.defaultProps = {
  width: window.innerWidth,
  height: 500,
  radius: 200,
  autorotate: true,
  velocity: 0.05,
  scrollTop: 0,
  earthImage: earthImage,
  earthBumpImage: earthBumpImage
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
};

export default GlobeComponent;
