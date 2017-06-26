class Text {
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
  }

  drawAxis() {
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
}


const app = document.querySelector('#app')
const text = new Text(app)
text.init()
