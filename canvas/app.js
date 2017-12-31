function draw() {
  const ctx = document.getElementById('app').getContext('2d')

  // 画矩形
  // ctx.fillStyle = 'rgb(200, 0, 0)'
  // ctx.fillRect(0, 0, 600, 600)
  // ctx.clearRect(100,100,400,400)
  // ctx.strokeStyle = 'rgb(0,0,200)'
  // ctx.strokeRect(200.5, 200.5, 200, 200)

  // 画路径
  // ctx.beginPath()
  // ctx.moveTo(100, 100)
  // ctx.lineTo(200, 200)
  // ctx.lineTo(200, 150)
  //
  // ctx.moveTo(250, 250)
  // ctx.lineTo(100, 200)
  // ctx.lineTo(100, 300)
  // // ctx.closePath()
  //
  // ctx.strokeStyle = 'rgb(200, 0, 0)'
  // ctx.stroke()
  // ctx.fillStyle = 'rgba(0,0,200, 0.3)'
  // // ctx.fill()
  //
  // ctx.beginPath()
  // ctx.moveTo(100, 300)
  // ctx.lineTo(500, 500)
  //
  // ctx.lineWidth = 1
  // ctx.setLineDash([10, 10])
  // ctx.lineDashOffset = 1
  // ctx.stroke()

  // 画笑脸
  // ctx.strokeStyle = 'rgb(200, 0, 0)'
  //
  // const laugh = new Path2D()
  //
  // laugh.arc(175, 175, 50, 0, Math.PI * 2, true)
  // laugh.moveTo(210, 175)
  // laugh.arc(175, 175, 35, 0, Math.PI, false)
  // laugh.moveTo(165, 165)
  // laugh.arc(160, 165, 5,0, Math.PI * 2, true)
  // laugh.moveTo(195,165)
  // laugh.arc(190, 165, 5, 0, Math.PI * 2, true)
  //
  // ctx.stroke(laugh)
  // const radialGradient = ctx.createRadialGradient(150, 150, 150, 45, 45, 0)
  // radialGradient.addColorStop(0, 'rgb(200, 0, 0)')
  // radialGradient.addColorStop(0.5, 'rgb(200, 200, 0)')
  // radialGradient.addColorStop(1, 'rgb(0, 200, 0)')
  // const linearGradient = ctx.createLinearGradient(0, 0, 150, 150)
  // linearGradient.addColorStop(0, 'rgb(200, 0, 0)')
  // linearGradient.addColorStop(0.5, 'rgb(200, 200, 0)')
  // linearGradient.addColorStop(1, 'rgb(0, 200, 0)')
  //
  // ctx.strokeStyle = linearGradient
  // ctx.fillRect(0, 0, 300, 300)
  // ctx.moveTo(0, 0)
  // ctx.lineTo(150, 150)
  //
  // ctx.shadowOffsetX = 0
  // ctx.shadowOffsetY = 0
  // ctx.shadowBlur = 10
  // ctx.shadowColor = 'rgb(200, 0, 0)'
  // ctx.stroke()

  // ctx.beginPath()
  // ctx.arc(100, 100, 80, 0, Math.PI * 2, true)
  // ctx.arc(70, 100, 20, 0, Math.PI * 2, true)
  // ctx.arc(100, 100, 20, 0, Math.PI * 2, true)
  // ctx.stroke()
  // ctx.fill('evenodd')

  // ctx.font = "48px sans-serif"
  // const text = ctx.measureText("foo")
  // console.log(text)

  // ctx.drawImage(document.getElementById('logo'), 200, 200, 200, 200, 0, 0, 100, 100)
  // ctx.fillRect(0,0,200, 200)
  // ctx.save() // 黑色，globalAlpha 1
  //
  // ctx.fillStyle = '#09f'
  // ctx.fillRect(10,10,180, 180)
  // ctx.save()
  //
  // ctx.fillStyle = '#fff'
  // ctx.globalAlpha = 0.5
  // ctx.fillRect(20, 20,160, 160)
  // // ctx.save()
  //
  // ctx.restore()
  // ctx.fillRect(30, 30, 140, 140)
  //
  // ctx.restore()
  // ctx.fillRect(40, 40, 120, 120)
  // ctx.save()
  // ctx.translate(10, 10)
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.restore()
  //
  // ctx.save()
  // ctx.translate(110, 10)
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.restore()
  //
  // ctx.save()
  // ctx.translate(10, 10)
  // ctx.translate(200, 0)
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.restore()

  // function drawCircle() {
  //   ctx.beginPath()
  //   ctx.arc(50, 0, 10, 0, Math.PI * 2, true)
  //   ctx.closePath()
  //   ctx.fill()
  // }
  //
  //
  // ctx.save()
  // ctx.translate(200, 200);
  // [0, 1, 2, 3].forEach((value) => {
  //   ctx.rotate(Math.PI / 2 * value)
  //   drawCircle()
  // })
  // ctx.restore()

  // ctx.translate(75,75);
  //
  // for (var i=1;i<6;i++){ // Loop through rings (from inside to out)
  //   ctx.save();
  //   ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';
  //
  //   for (var j=0;j<i*6;j++){ // draw individual dots
  //     ctx.rotate(Math.PI*2/(i*6));
  //     ctx.beginPath();
  //     ctx.arc(0,i*12.5,5,0,Math.PI*2,true);
  //     ctx.fill();
  //   }
  //
  //   ctx.restore();
  // }

  ctx.fillRect(0, 0, 200, 200)
  ctx.save()
  ctx.translate(100, 100)

  // clip
  ctx.beginPath()
  ctx.arc(0,0, 90, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()


  // 画背景
  var lingrad = ctx.createLinearGradient(0,-75,0,75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');

  ctx.fillStyle = lingrad;
  ctx.fillRect(-100, -100, 200, 200);

  new Array(50).fill(0).forEach((value, index) => {
    const x = Math.random() * 200 - 100
    const y = Math.random() * 200 - 100
    const r = Math.random() * 5

    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = '#fff'
    drawStar(ctx, r)
    ctx.restore()
  })


}

function drawStar(ctx, r) {
  ctx.save()
  ctx.rotate(Math.PI * 2 * Math.random())
  ctx.beginPath()
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 == 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

// draw()

// const img = document.createElement('img')
// img.src = 'logo-vue.png'
window.addEventListener('load', draw)
