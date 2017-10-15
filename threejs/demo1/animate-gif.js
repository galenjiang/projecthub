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
 }

  init() {
/*------------------------------------------------ static start -----------------------------------------------------------------------------*/
    // stats
    this.drawStats()
    // gui
    this.drawGUI()
    // axis
    this.drawAxis()
    // line
    // this.drawLine()
    // sprite
    this.drawSpirit()
/*------------------------------------------------ static start -----------------------------------------------------------------------------*/
/*------------------------------------------------ render start -----------------------------------------------------------------------------*/
    const render = (time) => {
      this.stats.begin()
      TWEEN.update(time)
      this.ani.update(time/5000)
      const mat = this.ani.gif.getTexture()
      console.log(mat)
      if(mat){
        this.sprite2.material = new THREE.SpriteMaterial({ map: mat})
      }

      /*------------------------------------------------ render content start -----------------------------------------------------------------------------*/



























/*------------------------------------------------ render content end -----------------------------------------------------------------------------*/

      this.stats.end()
      requestAnimationFrame(render)
      this.renderer.render(this.scene, this.camera)
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
      this.color = [ 0, 128, 255 ]
      this.display = true
    }
    const gui = new dat.GUI()
    const oGUIText = new GUIText()
    gui.add(oGUIText, 'message')
      .onFinishChange((value) => {
      })

    gui.add(oGUIText, 'display')
      .onFinishChange((value) => {
      })


    gui.addColor(oGUIText, 'color')
      .onChange((value) => {
        this.renderer.setClearColor(new THREE.Color(`rgb(${Math.round(value[0])}, ${Math.round(value[1])}, ${Math.round(value[2])})`))
      })

    // this.oGUIText = oGUIText
  }

  drawAxis() {
    this.scene.add(new THREE.AxisHelper(20))
  }
  drawLine() {
    const lineGeo = new THREE.Geometry()
    lineGeo.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(100, 100, 100),
      new THREE.Vector3(100, 0, 100),
      new THREE.Vector3(0, 0, 0)
    )
    const colors = [
      new THREE.Color('#ff00ff'),
      new THREE.Color('#ff0000'),
      new THREE.Color('#0000ff'),
      new THREE.Color('#00ff00'),
    ]
    lineGeo.colors = colors
    const material = new THREE.LineBasicMaterial({
      linewidth: 2,
      vertexColors: THREE.FaceColors
    })
    this.scene.add(new THREE.Line(lineGeo, material))
  }
  drawSpirit() {
    const loader = new THREE.TextureLoader()
    const t1 = loader.load('image/UV_Grid_Sm.jpg')
    const mat1 = new THREE.SpriteMaterial({ map: t1, color: 0xffffff })
    const sprite1 = new THREE.Sprite(mat1)
    sprite1.scale.set(200, 200, 1)

    this.scene.add(sprite1)
    // add animation gif
    // https://github.com/shachaf/jsgif gif parser
    // const t2 = loadGif('image/demo1.gif')

    this.ani = loadAnim('image/demo1.gif')
    // this.ani.gif.setFps(15)
    // this.ani.gif.setLength(30)
    console.log(this.ani.gif.getTexture())
    // setInterval(() => {
    //   this.ani.gif.update()
    // })
    const mat2 = new THREE.SpriteMaterial({ map: this.ani.gif.getTexture(), color: 0xffffff })
    const sprite2 = new THREE.Sprite(mat2)
    sprite2.scale.set(200, 100, 1)
    sprite2.position.z += 1
    this.scene.add(sprite2)
    this.sprite2 = sprite2
    // this.mat2 = mat2
  }


}


const app = document.querySelector('#app')
const basic = new Basic(app)
basic.init()
