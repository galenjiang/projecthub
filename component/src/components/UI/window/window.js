class Window {
  constructor () {
    this.cfg = {
      width: 500,
      height: 300,
      content: "",
      handler: null
    }
    this.handlers = {}
  }
  on (type, handler) {
    if(typeof this.handlers[type] === `undefined`){
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }
  fire (type, data) {
    if(this.handlers[type] instanceof Array){
      let handlers = this.handlers[type];
      handlers.forEach((val, index) => {
        handlers[index](data)
      })
    }
  }

  alert ({
    content = this.cfg.content,
    handler =  this.cfg.handler,
    width = this.cfg.width,
    height = this.cfg.height,
    left = `${(window.innerWidth - this.cfg.width)/2}px`,
    top = `${(window.innerHeight - this.cfg.height)/2}px`
    } = {}){
    let _this = this;
    if(handler){
      _this.on(`alert`, handler)
    }
    let oBody = document.querySelector(`body`)
    let boundingBox = document.createElement(`div`)
    boundingBox.className = `widnow_boundingBox`
    boundingBox.innerHTML = content;
    $(boundingBox).css({
      width: width,
      height: height,
      left: left,
      top: top
    })

    let oBtn1 = document.createElement(`botton`)
    oBtn1.innerHTML = `确定`;
    oBtn1.className = `alert-confirm`;
    oBtn1.type = `botton`;
    oBtn1.addEventListener(`click`, () => {
      _this.fire(`alert`)
      oBody.removeChild(boundingBox)
    },false)
    boundingBox.appendChild(oBtn1)
    oBody.appendChild(boundingBox)

  }

  comfirm () {

  }
  prompt () {
  }

}

exports.Window = Window
