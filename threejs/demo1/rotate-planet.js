class Planet {
  constructor(container) {
    const sceneWidth = container.offsetWidth
    const sceneHeight = container.offsetHeight

    this.container = container
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneWidth

    this.renderer = new THREE.WebGLRenderer({ canvas: container })
    this.renderer.setSize(sceneWidth, sceneHeight)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 1, 5000)
    this.camera.position.set(0, 200, 500)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.cubeGroup = []
 }

  init() {
/*------------------------------------------------ static start -----------------------------------------------------------------------------*/
    // stats
    this.drawStats()
    // gui
    this.drawGUI()
    // axis
    this.drawAxis()
    // add controller
    this.addController()
    // light
    this.drawLight()
    // ground
    this.drawGround()
    // 3d object
    this.drawSphere()
    this.drawCubeGroup()
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
    // const control = {x: 0}
    // const arr = [{x: 0}, {x: 1}, {x: 2}]
    // function tweenFunc(start) {
    //   const tween = new TWEEN.Tween({x: start})
    //   .to({ x: start + 1 }, 1000)
    //   .delay(3000)
    //   .onUpdate(function() {
    //     arr[start].x = this.x
    //     console.log(`arr[${start}]`, arr[start].x)
    //   })
    //   .onComplete(() => {
    //     // setTimeout(() => {
    //     //   tween.start()
    //     // }, 3000)
    //     start === 3 && (arr[2].x = 0)
    //   })
    //   .repeat(Infinity)
    //   .start()
    // }
    // arr.forEach((el, index) => {
    //   tweenFunc(index)
    // })
    let flag = 0
    function allComplete() {
      flag += 1
      if(flag === 5) {
        console.log('all done')
      }
    }
    function createTween(position) {
      const t = new TWEEN.Tween({y: 0})
      t.onUpdate(function (){
        console.log(this.y)
      })
      t.to({y: 1}, 1000)
        .start()
        .onComplete(() => {
          t.to({y: 0}, 0)
            .onComplete(() => {
              console.log('2nd compolete')
            })
        })
    }

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
    setInterval(() => {
      this.cubeGroup.forEach((el) => {
          const originY = el.rotation.y
          let dy = Math.PI / 4
          if((originY + dy) % (Math.PI * 2) > Math.PI) {
            dy = Math.PI
          }
          const tween = new TWEEN.Tween({ y: originY })
            .to({ y: originY + dy }, 1000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function() {
              el.rotation.y = this.y
            })
            .onComplete(() => {
              el.rotation.y = Math.round(el.rotation.y / (Math.PI / 4)) * (Math.PI / 4) % (Math.PI * 2)
              // console.log(Math.round(el.rotation.y / (Math.PI / 4)))
            })
            .start()
      })
    }, 5000)
/*------------------------------------------------ static start -----------------------------------------------------------------------------*/
/*------------------------------------------------ render start -----------------------------------------------------------------------------*/
    const render = (time) => {
      this.stats.begin()
      TWEEN.update(time)
/*------------------------------------------------ render content start -----------------------------------------------------------------------------*/


      this.controller.update()























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

  addController() {
    this.controller = new THREE.OrbitControls( this.camera )
  }

  drawLight() {
    // light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set( 0, 1000, 500 );
    this.scene.add(light);
  }
  drawGround() {
    const planeGeo = new THREE.PlaneGeometry(360 * 3, 240 * 3)
    const planeMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.rotation.x = - Math.PI / 2
    plane.position.y = -100
    this.scene.add(plane)

  }
  drawSphere() {
    const sphereGeometry = new THREE.SphereGeometry(50, 10, 10)
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(sphereGeometry, material)
    sphere.position.set(0, 0, 0)
    this.scene.add(sphere)
  }
  drawCubeGroup() {
    const group = new THREE.Object3D()
    const yAxis = new THREE.Vector3(0, 1, 0)

    const sphereArray = [0, 1, 2, 3, 4]
    sphereArray.forEach((el, index) => {
      const material = new THREE.MeshLambertMaterial({ color: 0xffffff })

      const cubeGeometry = new THREE.BoxGeometry(20, 20, 20)
      const cube = new THREE.Mesh(cubeGeometry, material)
      cube.position.set(- 100, 0, 0)
      const wrapper = new THREE.Object3D()
      wrapper.add(cube)
      this.cubeGroup.push(wrapper)
      wrapper.rotation.y = Math.PI / 4 * index
      group.add(wrapper)
    })
    this.group = group
    this.scene.add(group)
  }
}


const app = document.querySelector('#app')
const planet = new Planet(app)
planet.init()
