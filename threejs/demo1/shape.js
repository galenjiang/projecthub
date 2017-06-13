const container = document.querySelector('#scene')
const vw = window.innerWidth
const vh = window.innerHeight

const init = function() {
// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: container,
})
renderer.setClearColor(0x3F3F3F)
renderer.setSize(vw, vh)

// camera
const camera = new THREE.PerspectiveCamera(90, vw / vh, 1, 2000)
camera.position.set(800, 450, 500)
camera.lookAt(new THREE.Vector3(0,0,0));

// scene
const scene = new THREE.Scene()

// light
const light = new THREE.DirectionalLight(0xffffff, 0.6)
light.position.set( 0, 500, 500 );
scene.add(light);



const createShape = function(scene, parent) {
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false })

  // cube
  const cubeGeometry = new THREE.BoxGeometry(200, 200, 200)
  const cube = new THREE.Mesh(cubeGeometry, material)
  // scene.add(cube)
  parent.add(cube)
  // sphere
  const sphereGeometry = new THREE.SphereGeometry(100, 10, 10)
  const sphere = new THREE.Mesh(sphereGeometry, material)
  sphere.position.set(250, 0, 0)
  // scene.add(sphere)
  parent.add(sphere)
  // cylinder
  const cylinderGeometry = new THREE.CylinderGeometry(30, 50, 200, 10)
  const cylinder = new THREE.Mesh(cylinderGeometry, material)
  cylinder.position.set(500, 0, 0)
  // scene.add(cylinder)
  parent.add(cylinder)

  scene.add(parent)
}

const clickHandler = function(e) {
  const ww = window.innerWidth
  const wh = window.innerHeight
  //We create a 2D vector
  vector = new THREE.Vector2();
  //We set its position where the user clicked and we convert it to a number between -1 & 1
  console.log(2 * (e.clientX / ww) - 1, 1 - 2 * (e.clientY / wh))
  vector.set(
    2 * (e.clientX / ww) - 1,
    1 - 2 * (e.clientY / wh )
  );

  //We create a raycaster, which is some kind of laser going through your scene
  raycaster = new THREE.Raycaster();
  //We apply two parameters to the 'laser', its origin (where the user clicked) and the direction (what the camera 'sees')
  raycaster.setFromCamera(vector,camera);

  //We get all the objects the 'laser' find on its way (it returns an array containing the objects)
  intersects = raycaster.intersectObjects(parent.children);

  //If detect that we have at least 1 object
  //The first object in the array is the closest to the camera
  if(intersects.length > 0 ){
    //We apply a random color to the first object
    intersects[0].object.material = new THREE.MeshLambertMaterial({ color : new THREE.Color(parseInt(Math.random()*16777216)) } );

    //We render our scene
    renderer.render(scene,camera);
  }
}


// container object
const parent = new THREE.Object3D()

// add object
createShape(scene, parent)

renderer.render(scene, camera)

document.addEventListener('click', clickHandler)
}
init()

