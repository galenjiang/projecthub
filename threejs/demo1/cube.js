class Scene {
  constructor(container, config = []) {
    const sceneWidth = container.offsetWidth
    const sceneHeight = container.offsetHeight

    this.container = container
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneWidth

    if(!config[0]) {
      this.renderer = new THREE.WebGLRenderer({ canvas: container })
      this.renderer.setSize(sceneWidth, sceneHeight)
      this.renderer.shadowMap.enabled = true

    }

    if(!config[1]) {
      this.scene = new THREE.Scene()
    }

    if(!config[2]) {
      this.camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 1, 2000)
      this.camera.position.set(-500, 500, 1000)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    // TODO:
    this.tween = {}
    this.rotationMouseMove = 0
 }

  init() {
    this.renderer.render(this.scene, this.camera)
    return this
  }

  animations() {
    // TODO:
    this.cubeContainer.rotation.y += (this.rotationMouseMove - this.cubeContainer.rotation.y) * 0.1
  }

  addObject(func) {
    func.call(this)
    return this
  }

  animate() {
    const render = (time) => {
      stats.begin()
      TWEEN.update(time)
      this.animations()
      this.renderer.render(this.scene, this.camera)

      stats.end()
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

    return this
  }

  callFunc(func) {
    func.call(this)
    return this
  }

}

const app = document.querySelector('#app')

const stats = new Stats()
stats.showPanel( 0 )
document.querySelector('body').appendChild( stats.dom )
const loader = new THREE.TextureLoader()
const cubeScene = new Scene(app)
cubeScene
  .addObject(drawAxis)
  .addObject(drawObject)
  .addObject(drawPlane)
  .addObject(drawLight)
  .init()
  .animate()
  .callFunc(function() {
    const _this = this
    let clientXMouseDown = 0
    let rotationMouseMove = 0
    document.addEventListener('mousedown', onDocumentMouseDown, false)

    function onDocumentMouseDown(event) {
      event.preventDefault()
      _this.tween.cubeRotationTween.stop()
      clientXMouseDown = event.clientX
      document.addEventListener('mousemove', onDocumentMouseMove, false)
      document.addEventListener('mouseup', onDocumentMouseUp, false)
    }

    function onDocumentMouseMove(event) {
      let temp = event.clientX - clientXMouseDown
      rotationMouseMove =  temp * 0.02

      _this.rotationMouseMove = _this.cube.rotation.y + rotationMouseMove
      // _this.cubeContainer.rotation.y += rotationMouseMove
    }

    function onDocumentMouseUp() {
      document.removeEventListener('mousemove', onDocumentMouseMove, false)
      document.removeEventListener('mouseup', onDocumentMouseUp, false)
      rotateCube.call(_this)
    }

  })
  .callFunc(rotateCube)

function rotateCube() {
  const _this = this
  const x = this.cube.rotation.x
  const y = this.cube.rotation.y
  const z = this.cube.rotation.z
  const tween = new TWEEN.Tween({ x: x, y: y, z: z })
    .to({ x: x + Math.PI *2, y: y + Math.PI *2, z: z + Math.PI *2 }, 5000)
    .onUpdate(function() {
      _this.cube.rotation.x = this.x
      _this.cube.rotation.y = this.y
      _this.cube.rotation.z = this.z
    })
    .repeat( Infinity )
    .start()
  this.tween.cubeRotationTween = tween
}

// function rotateCubeContainer() {
//   if(Math.abs(this.rotationMouseMove) < 0.00001) {
//     this.rotationMouseMove = 0
//     this.removeAnimation('rotateCubeContainer')
//     this.addAnimation('rotateCube', rotateCube)
//   } else {
//     this.cubeContainer.rotation.y += this.rotationMouseMove
//     this.rotationMouseMove *= 0.95
//   }

// }


function drawAxis() {
  // x axis
  const xGeo = new THREE.Geometry()
  xGeo.vertices.push(new THREE.Vector3(0, 0, 0))
  xGeo.vertices.push(new THREE.Vector3(13, 0, 0))
  const xMat = new THREE.LineBasicMaterial({ color: 0xff0000 })
  const xLine = new THREE.Line(xGeo, xMat)
  this.scene.add(xLine)

  // y axis
  const yGeo = new THREE.Geometry()
  yGeo.vertices.push(new THREE.Vector3(0, 0, 0))
  yGeo.vertices.push(new THREE.Vector3(0, 13, 0))
  const yMat = new THREE.LineBasicMaterial({ color: 0x00ff00 })
  const yLine = new THREE.Line(yGeo, yMat)
  this.scene.add(yLine)

  // z axis
  const zGeo = new THREE.Geometry()
  zGeo.vertices.push(new THREE.Vector3(0, 0, 0))
  zGeo.vertices.push(new THREE.Vector3(0, 0, 13))
  const zMat = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const zLine = new THREE.Line(zGeo, zMat)
  this.scene.add(zLine)
}


function drawObject() {

  const crateTexture = loader.load('image/crate.gif')


  const cubeContainer = new THREE.Object3D()
  const cubeGeo = new THREE.BoxBufferGeometry(200, 200, 200)
  // const len = cubeGeo.faces.length
  // for(let i = 0; i < len; i += 2) {
  //   const color = Math.random() * 0xffffff
  //   cubeGeo.faces[i].color.setHex(color)
  //   cubeGeo.faces[i + 1].color.setHex(color)
  // }
  const cubeMat = new THREE.MeshLambertMaterial({ map: crateTexture })
  // const cubeMat = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors, overdraw: .5 })
  const cube = new THREE.Mesh(cubeGeo, cubeMat)
  cube.position.set(0, 150, 0)
  cube.castShadow = true
  cubeContainer.add(cube)
  this.cube = cube

  const earthTexture = loader.load('image/earth_atmos_2048.jpg')
  const bumpEarthTexture = loader.load('image/earth_specular_2048.jpg')

  const material = new THREE.MeshPhongMaterial({ overdraw: 0.5, map: earthTexture, bumpMap: bumpEarthTexture })
  const sphere = new THREE.Mesh( new THREE.SphereGeometry( 100, 50, 50 ), material );
  sphere.position.set( -300, 200, 400 );
  cubeContainer.add( sphere );



  this.cubeContainer = cubeContainer
  this.scene.add(cubeContainer)
}

function drawPlane() {
  const planeGeo = new THREE.PlaneGeometry(360 * 3, 240 * 3)
  planeGeo.vertices[0].uv = new THREE.Vector2(0, 0)
  planeGeo.vertices[1].uv = new THREE.Vector2(1, 0)
  planeGeo.vertices[2].uv = new THREE.Vector2(1, 1)
  planeGeo.vertices[3].uv = new THREE.Vector2(0, 1)
  // const loader = new THREE.TextureLoader()
  const texture = loader.load('image/image1.jpg')
  const planeMat = new THREE.MeshLambertMaterial({ color: 0xcccccc, side: THREE.DoubleSide, map: texture })
  const plane = new THREE.Mesh(planeGeo, planeMat)
  plane.rotation.x = - Math.PI / 2
  plane.position.y = -100
  plane.receiveShadow = true
  this.scene.add(plane)


}

function drawLight() {
  const environLight = new THREE.AmbientLight(0xffffff)
  environLight.intensity = 0.5
  // environLight.castShadow = true
  this.scene.add(environLight)

  const light = new THREE.DirectionalLight(0xffffff)
  light.castShadow = true
  light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 4000;
  light.shadow.camera.fov = 90;
  light.position.set(0, 600, 0)
  this.scene.add(light)
}
