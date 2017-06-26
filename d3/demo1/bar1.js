// const app = document.querySelector('#app')

// new Array(5).fill('').forEach((item, index) => {
//   let p = document.createElement('p')
//   // p.innerHTML = `第${index + 1}条记录`
//   // p.style.setProperty('color', 'pink')
//   app.appendChild(p)
// })


const data = [4, 8, 15, 16, 23, 42]

var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 700]);

console.log(x)

const chart = d3.selectAll('#app')

d3.select('#app')
  .selectAll('div')
  .data(data)
  .enter()
  .append('div')
  .style('width', (d) => {
    return `${x(d)}px`
  })
  .style('border', '1px solid')
  .text((d) => {
    return d
  })
