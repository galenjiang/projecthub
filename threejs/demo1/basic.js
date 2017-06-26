class Scene {
  constructor(container) {
    const sceneWidth = container.offsetWidth
    const sceneHeight = container.offsetHeight

    this.container = container
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneWidth

    this.renderer = new THREE.WebGLRenderer({ canvas: container })
    this.renderer.setSize(sceneWidth, sceneHeight)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 1, 1000)
    this.camera.position.set(0, 100, 500)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
 }

  init() {
    this.drawAxis()

    this.renderer.render(this.scene, this.camera)
    return this
  }

  animate() {
    const _this = this

    requestAnimationFrame(update)

    function update(time) {
      TWEEN.update(time)
      _this.renderer.render(_this.scene, _this.camera)
      requestAnimationFrame(update)
    }

    return this
  }

  // test tween
  rotateAxix() {
    const _this = this
    const angle = { y: 0 }
    const tween = new TWEEN.Tween(angle)
      .to({ y: Math.PI * 2 }, 5000)
      .onUpdate(function() {
        _this.axis.rotation.y = this.y
      })
      .repeat(Infinity )
      .start()
  }


  drawAxis() {
    const axis = new THREE.Object3D()
    // x axis
    const xGeo = new THREE.Geometry()
    xGeo.vertices.push(new THREE.Vector3(0, 0, 0))
    xGeo.vertices.push(new THREE.Vector3(13, 0, 0))
    const xMat = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const xLine = new THREE.Line(xGeo, xMat)
    axis.add(xLine)

    // y axis
    const yGeo = new THREE.Geometry()
    yGeo.vertices.push(new THREE.Vector3(0, 0, 0))
    yGeo.vertices.push(new THREE.Vector3(0, 13, 0))
    const yMat = new THREE.LineBasicMaterial({ color: 0x00ff00 })
    const yLine = new THREE.Line(yGeo, yMat)
    axis.add(yLine)

    // z axis
    const zGeo = new THREE.Geometry()
    zGeo.vertices.push(new THREE.Vector3(0, 0, 0))
    zGeo.vertices.push(new THREE.Vector3(0, 0, 13))
    const zMat = new THREE.LineBasicMaterial({ color: 0x0000ff })
    const zLine = new THREE.Line(zGeo, zMat)
    axis.add(zLine)
    this.axis = axis
    this.scene.add(axis)
  }
}


const app = document.querySelector('#app')
const scene = new Scene(app)
scene.init()
  // .animate()
  // .rotateAxix()


init = (func) => {
  const render = (time) => {
    stats.begin()
    TWEEN.update(time)
    func()
    stats.end()
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}
init(() => {

    animations()
    renderer.render(this.scene, this.camera)
})
