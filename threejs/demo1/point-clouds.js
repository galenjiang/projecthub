class Basic {
  constructor(container) {
    const sceneWidth = container.offsetWidth
    const sceneHeight = container.offsetHeight

    this.container = container
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneWidth

    this.renderer = new THREE.WebGLRenderer({ canvas: container })
    this.renderer.setClearColor('#eeeeee')
    this.renderer.setSize(sceneWidth, sceneHeight)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 1, 2000)
    this.camera.position.set(0, 150, 500)
    this.camera.lookAt(this.scene.position)
    this.animationLoop = []
    this.objection = []
 }

  init() {
/*------------------------------------------------ static start -----------------------------------------------------------------------------*/
    // stats
    this.drawStats()
    // gui
    this.drawGUI()
    // axis
    this.drawAxis()
/*------------------------------------------------ static start -----------------------------------------------------------------------------*/
/*------------------------------------------------ render start -----------------------------------------------------------------------------*/
    const render = (time) => {
      this.stats.begin()
      TWEEN.update(time)
/*------------------------------------------------ render content start -----------------------------------------------------------------------------*/
      this.animationLoop.forEach((loop) => {
        loop.call(this)
      })



/*------------------------------------------------ render content end -----------------------------------------------------------------------------*/
      this.renderer.render(this.scene, this.camera)

      this.stats.end()
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
/*------------------------------------------------ render end -----------------------------------------------------------------------------*/
  }
  drawStats() {
    const stats = new Stats()
    stats.showPanel( 0 )
    document.querySelector('body').appendChild( stats.dom )
    this.stats = stats
  }

  drawGUI() {
    function GUIText() {
      this.message = 'hello world!'
      this.speed = 0
      this.display = true
    }
    const gui = new dat.GUI()
    const oGUIText = new GUIText()
    gui.add(oGUIText, 'message')
      .onFinishChange((value) => {
        console.log(value)
      })

    gui.add(oGUIText, 'display')
      .onFinishChange((value) => {
        console.log(value)
      })


    gui.add(oGUIText, 'speed', -5, 5)
      .onFinishChange((value) => {
        console.log(value)
      })
  }

  drawAxis() {
    this.scene.add(new THREE.AxisHelper(20))
  }
  addObject(obj) {
    if(obj) {
      this.scene.add(obj)
    }
  }
  addLoop(loop) {
    this.animationLoop.push(loop)
  }

}


const app = document.querySelector('#app')
const basic = new Basic(app)
basic.init()



// const cube = new THREE.SceneUtils.createMultiMaterialObject(
//   new THREE.SphereGeometry(50, 10, 5),
//   [
//     new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 }),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }),
//   ]
// )
const pointsGeo = new THREE.Geometry()
const range = 200
const horizontalVelocity = 3
const verticalVelocity = 2
for(let i = 0; i < 100; i++) {
  const point = new THREE.Vector3(
    Math.random() * range -range / 2,
    Math.random() * range -range / 2,
    Math.random() * range -range / 2,
  )
  point.vx = horizontalVelocity * Math.random() - horizontalVelocity / 2
  point.vz = horizontalVelocity * Math.random() - horizontalVelocity / 2
  point.vy = verticalVelocity * Math.random() - verticalVelocity / 2
  // point.needsUpdate = true
  pointsGeo.vertices.push(point)
}
const points = new THREE.Points(pointsGeo, new THREE.PointsMaterial({ color: 0x0000ff, size: 2 }))
basic.addObject(points)
basic.addLoop(() => {
  pointsGeo.verticesNeedUpdate = true
  points.geometry.vertices.forEach((v) => {
    v.x = v.x + v.vx
    v.z = v.z + v.vz
    v.y = v.y + v.vy * (v.y + range / 2 + range / 2) / (range / 2)
    if(v.x > range / 2) {
      v.x = range / 2
      v.vx = -v.vx
    }
    if(v.x < - range / 2) {
      v.x = - range / 2
      v.vx = -v.vx
    }
    if(v.z > range / 2) {
      v.z = range / 2
      v.vz = -v.vz
    }
    if(v.z < - range / 2) {
      v.z = - range / 2
      v.vz = -v.vz
    }
    if(v.y > range / 2) {
      v.y = range / 2
      v.vy = -v.vy
    }
    if(v.y < - range / 2) {
      v.y = - range / 2
      v.vy = -v.vy
    }
  })
})
