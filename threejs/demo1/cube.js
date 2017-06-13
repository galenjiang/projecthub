var container = document.querySelector('#scene')
var renderWidth = container.offsetWidth
var renderHeight = container.offsetHeight

// renderer
var renderer = new THREE.WebGLRenderer({ canvas: container });
renderer.setSize( renderWidth, renderHeight);


var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 100, 1000 );
camera.position.set(0, 0, 800);
// camera.lookAt(new THREE.Vector3(0, 0, -100));


var scene = new THREE.Scene();

// 坐标轴
function drawAxes(scene){
  // x-axis
  var xGeo = new THREE.Geometry();
  xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  xGeo.vertices.push(new THREE.Vector3(13, 0, 0));
  var xMat = new THREE.LineBasicMaterial({color: 0xff0000});
  var xAxis = new THREE.Line(xGeo, xMat);
  scene.add(xAxis);

  // y-axis

  var yGeo = new THREE.Geometry();
  yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  yGeo.vertices.push(new THREE.Vector3(0, 13, 0));
  var yMat = new THREE.LineBasicMaterial({color: 0x00ff00});
  var yAxis = new THREE.Line(yGeo, yMat);
  scene.add(yAxis);

  // z-axis

  var zGeo = new THREE.Geometry();
  zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  zGeo.vertices.push(new THREE.Vector3(0, 0, 13));
  var zMat = new THREE.LineBasicMaterial({
      color: 0x0000ff
  });
  var zAxis = new THREE.Line(zGeo, zMat);
  scene.add(zAxis);
}

drawAxes(scene)

/* LIGHT */

//Create a white 'directional light'
light = new THREE.DirectionalLight(0xffffff, 1);

//We the position of our light
light.position.set( 50, 250, 500 );

//We add our light into the scene
scene.add(light);


// Cube
var geometry = new THREE.BoxGeometry( 200, 200, 200 );
for ( var i = 0; i < geometry.faces.length; i += 2 ) {
  var hex = Math.random() * 0xffffff;
  geometry.faces[ i ].color.setHex( hex );
  geometry.faces[ i + 1 ].color.setHex( hex );
}
var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
cube = new THREE.Mesh( geometry, material );
cube.position.y = 150;
console.log(cube.position)
scene.add( cube );



//Make our cube turn
const rotate = function(object) {
  // object.rotation.x += 0.02;
  // object.rotation.y += 0.02;
  object.rotation.z += 0.02;
}


// render
function render() {
  requestAnimationFrame( render );
  rotate(cube)
  renderer.render( scene, camera );
}
render();
