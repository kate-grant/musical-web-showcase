// Based on Shader Park shader library tutorial https://glitch.com/~starter-template-audio-reactive-shader-three-js-shader-park

import { AudioListener, Audio, AudioLoader, AudioAnalyser, Clock } from 'three';
import { Scene, SphereGeometry, Vector3, PerspectiveCamera, WebGLRenderer, Color, MeshBasicMaterial, Mesh} from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146/examples/jsm/controls/OrbitControls.js';
import { createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from '/sp-code.js';
import { projectData } from '/project-data.js';

const floating = document.getElementsByClassName("floating");
const floatingArr = Array.from(floating);
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const projectInfo = document.getElementById("modal-project-info")
const info = document.getElementById("info")
const infoPane = document.getElementById("info-pane");

      let title;
      let artist = null;
      let projectLink;
      let media;
      let vid;
      let artistStatement;
      let projectDescription = null;
      let bio;
      let artistBio

floatingArr.forEach((img, i) => {
  setTimeout(function(){
    img.style.visibility = "visible";
    img.addEventListener("click", () => {
      modal.classList.toggle('hide');

      let data;

      if (projectData && projectData[`${img.id}`]) {
        console.log("DATA", projectData[`${img.id}`]);
        data = projectData[`${img.id}`];
      } else {
        data = {projectName: "none", artistName: "none", videoLink: "", videoHeight: "0", videoWidth: "0", projectDecription: "none"}
      }


      if (artist === null && projectDescription === null) {

        title = document.createElement('h1');
        projectInfo.appendChild(title);
        title.classList.add("modal-project-title");
        title.innerHTML = data.projectName;

        artist = document.createElement('h2');
        projectInfo.appendChild(artist);
        artist.classList.add("modal-artist-name");
        artist.innerHTML = data.artistName;

        projectLink = document.createElement('a');
        projectInfo.appendChild(projectLink);
        projectLink.classList.add("modal-project-link");
        projectLink.href = data.projectLink;
        projectLink.target = "blank";
        projectLink.innerHTML = data.projectLink;


        // media = document.createElement('div');
        // projectInfo.appendChild(media);
        // media.classList.add("modal-project-media");
        // vid = document.createElement('iframe');
        // media.appendChild(vid);
        // vid.setAttribute("height", data.videoHeight);
        // vid.setAttribute("width", data.videoWidth);
        // vid.setAttribute("src", data.videoLink);

        artistStatement = document.createElement('h3');
        projectInfo.appendChild(artistStatement);
        artistStatement.innerHTML = "<br>Artist Statement:<br>";

        projectDescription = document.createElement('p');
        projectInfo.appendChild(projectDescription);
        projectDescription.innerHTML = data.projectDescription;

        bio = document.createElement('h3');
        projectInfo.appendChild(bio);
        bio.innerHTML = "Artist Bio:";

        artistBio = document.createElement('p');
        projectInfo.appendChild(artistBio);
        artistBio.innerHTML = data.artistBio;

      } else {
        title.innerHTML = data.projectName;

        artist.innerHTML = data.artistName;

        projectLink.href = data.projectLink;
        projectLink.innerHTML = data.projectLink;

        // vid.setAttribute("height", data.videoHeight);
        // vid.setAttribute("width", data.videoWidth);
        // vid.setAttribute("src", data.videoLink);

        projectDescription.innerHTML = data.projectDescription;

        artistBio.innerHTML = data.artistBio;
      }


    });
  }, i * 3000);
});

closeBtn.addEventListener("click", () => {
  modal.classList.toggle('hide');
});

info.addEventListener("click", () => {
  infoPane.classList.toggle('hide');
});


let scene = new Scene();

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5.5;

const canvas = document.getElementById("canvas");

let renderer = new WebGLRenderer({ canvas: canvas, antialias: true, transparent: true });
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 0);

let clock = new Clock();

let state = {
  time: 0.0,
  audio: 0.0,
  currAudio: 0.0,
}

const listener = new AudioListener();
camera.add( listener );

const sound = new Audio( listener );


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

canvas.addEventListener( 'scroll', () => {
  const curr = projectSection.getBoundingClientRect();

  projectSection.style.top = curr.y - 2;
});

const spiral = document.getElementById("spiral");

spiral.setAttribute("viewBow", `0 0 ${window.innerHeight} ${window.innerHeight}`);

