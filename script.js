import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log(THREE);

var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight,
        ASPECT = WIDTH / HEIGHT,
        VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;

    var container, renderer, camera, scene, sphere;

    function init() {
        var directionalLight;

        //div element that will hold renderer
        container = document.createElement('div');
        document.body.appendChild(container);

        //renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(renderer.domElement);

        //camera
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.position.z = 300;

        //lights
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        renderer.setClearColor(0x909090, 1.0);
        directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(0, -1, 0);

        scene = new THREE.Scene();
        scene.add(camera);
        scene.add(directionalLight);
        //scene.add(sphere);

        /**/
        var distance = 100;    
        var geometry = new THREE.Geometry();

        for (var i = 0; i < 1000; i++) {

            var vertex = new THREE.Vector3();
            
            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);
            
            vertex.x = distance * Math.sin(theta) * Math.cos(phi);
            vertex.y = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            geometry.vertices.push(vertex);
        }
        var particles = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({color: 0xffffff}));
        particles.boundingSphere = 50;
        //var particles = new THREE.Mesh(geometry, sphereMaterial);
        scene.add(particles);
        /**/

        //we add the even listener function to the domElement
        // renderer.domElement.addEventListener( 'mousedown', onMouseDown );
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }

    init();
    animate();