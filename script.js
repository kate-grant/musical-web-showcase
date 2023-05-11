// Based on Shader Park shader library tutorial https://glitch.com/~starter-template-audio-reactive-shader-three-js-shader-park

import { AudioListener, Audio, AudioLoader, AudioAnalyser, Clock } from 'three';
import { Scene, SphereGeometry, Vector3, PerspectiveCamera, WebGLRenderer, Color, MeshBasicMaterial, Mesh} from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146/examples/jsm/controls/OrbitControls.js';
import { createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from '/sp-code.js';

const floating = document.getElementsByClassName("floating");
const floatingArr = Array.from(floating);

floatingArr.forEach((img, i) => {
  setTimeout(function(){
    img.style.visibility = "visible";
  }, i * 3000);  
})

let scene = new Scene();

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5.5;

const canvas = document.getElementById("canvas");

let renderer = new WebGLRenderer({ canvas: canvas, antialias: true, transparent: true });
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 0);
// document.body.appendChild( renderer.domElement );

let clock = new Clock();

let state = {
  time: 0.0,
  audio: 0.0,
  currAudio: 0.0,
}

let button = document.getElementById('play-button');

const listener = new AudioListener();
camera.add( listener );

// create a global audio source
const sound = new Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new AudioLoader();
audioLoader.load( 'https://cdn.glitch.global/9b48c83c-6c8e-4281-a381-d57318641fca/irreducible-111374.mp3?v=1683555316658', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.4);
	button.addEventListener('pointerdown', () => {
    if (sound.isPlaying) {
      sound.pause();
      button.style.backgroundImage = "url(https://cdn.glitch.global/9b48c83c-6c8e-4281-a381-d57318641fca/btn_1_goo.png?v=1683791123149)";
      // button.innerHTML = 'START';
      button.alt = 'play';
      state.audio = 0.0;
      state.currAudio = 0.0;
    } else {
      sound.play();
      button.style.backgroundImage = "url(https://cdn.glitch.global/9b48c83c-6c8e-4281-a381-d57318641fca/btn_1_pause_n.png?v=1683797720799)";
      // button.innerHTML = 'STOP';
      button.alt = 'pause';
    }
    
  }, false);
});

const analyser = new AudioAnalyser( sound, 32 );

let geometry  = new SphereGeometry(2, 45, 45);

let mesh = createSculptureWithGeometry(geometry, spCode(), () => {
  return {
    time: state.time,
    audio: state.audio,
    isPlaying: state.isPlaying,
  }
})

scene.add(mesh);

let onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize );

let controls = new OrbitControls( camera, renderer.domElement, {
  enableZoom: false,
  enableDamping : true,
  dampingFactor : 0.25,
  rotateSpeed : 0.5
} );


let render = () => {
  requestAnimationFrame( render );
  state.time = state.time +clock.getDelta();
  if(analyser) {
    state.currAudio += Math.pow((analyser.getFrequencyData()[2] / 255) * .81, 8) + clock.getDelta() * .5;
    state.audio = .2 * state.currAudio + .8 * state.audio;
    
  }
  controls.update();
  renderer.render( scene, camera );
};

render();

const projectSection = document.getElementsByClassName("project-container");
const projects = document.getElementsByClassName("project-card");
const projectArray = Array.from(projects);

projectArray.forEach((project, i) => {
  
  window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    if (scroll > project.offsetTop - 500) {
      project.classList.add("show");
    }
  });
  
  if (i % 2 === 0) {
    project.classList.add("left");
  } else {
    project.classList.add("right");
    project.style.backgroundColor = "#85a09e";
  }
  
});

canvas.addEventListener( 'scroll', () => {
  const curr = projectSection.getBoundingClientRect();
  
  projectSection.style.top = curr.y - 2;
});

const spiral = document.getElementById("spiral");

spiral.setAttribute("viewBow", `0 0 ${window.innerHeight} ${window.innerHeight}`);
