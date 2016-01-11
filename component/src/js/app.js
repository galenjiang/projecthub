let $ = require(`jquery`);
require(`../components/base.css`)
let Window = require(`../components/window/window.js`).Window
require(`../components/window/window.css`)

$(document).ready(() => {
  let oBtn = document.querySelector(`button`)
  oBtn.addEventListener(`click`,() => {
    let win = new Window().alert({
      content:`welcome!`,
      handler: () => {
      alert(`you clicked the button`)
      } 
    })
  },false)
})
