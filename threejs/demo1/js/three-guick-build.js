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

window.Basic = Basic
