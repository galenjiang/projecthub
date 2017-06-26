const app = document.querySelector('#app')

new Array(5).fill('').forEach((item, index) => {
  let p = document.createElement('p')
  p.innerHTML = `第${index + 1}条记录`
  p.style.setProperty('color', 'pink')
  app.appendChild(p)
})

let ps = d3.selectAll('p')
  .data(['#f0000', '#0f0000', '#00f000', '#000f00', '#0000f0', '#00000f'])

ps
  .enter()
  .append('p')
  .text((d, i) => {
    return `i'm no ${i+1} text!`
  })
  .style((d, i) => {
    return d
  })

ps.style('color', (d, i) => {
    console.log(d, i)
    return d
  })

