const data = [
  { name: 'a', value: .08167 },
  { name: 'b', value: .01492 },
  { name: 'c', value: .02782 },
  { name: 'd', value: .04253 },
  { name: 'e', value: .12702 },
  { name: 'f', value: .08167 },
  { name: 'g', value: .01492 },
  { name: 'h', value: .02782 },
  { name: 'i', value: .04253 },
  { name: 'j', value: .12702 },
  { name: 'k', value: .08167 },
  { name: 'l', value: .01492 },
  { name: 'm', value: .02782 },
  // { name: 'n', value: 4.253 },
  // { name: 'o', value: 12.702 },
  // { name: 'p', value: 8.167 },
  // { name: 'q', value: 1.492 },
  // { name: 'r', value: 2.782 },
  // { name: 's', value: 4.253 },
  // { name: 't', value: 12.702 },
  // { name: 'u', value: 4.253 },
  // { name: 'v', value: 12.702 },
  // { name: 'w', value: 8.167 },
  // { name: 'x', value: 1.492 },
  // { name: 'y', value: 2.782 },
  // { name: 'z', value: 4.253 },
]

const margin = { top: 20, right: 30, bottom: 30, left: 40 }

const width = 480 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

const x = d3.scaleBand()
  // .domain(data.map(item => item.letter))
  .range([0, width])
  .paddingInner(0.2)
  .paddingOuter(0.1)

const y = d3.scaleLinear()
  .range([height, 0])


const chart = d3.select('.chart')
  // .attr('transform', `translate(${margin.left}, ${margin.right})`)
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const xAxis = d3.axisBottom(x)
const yAxis = d3.axisLeft(y)
  .ticks(10, '%');

function getData(data, callback) {
  callback(data)
}

getData(data, (d) => {
  x.domain(d.map(d => d.name))
  y.domain([0, d3.max(data, d => d.value)])
  const bar = chart.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x(d.name)}, 0)`)

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .style("text-anchor", "end")
    .text('frequency')

  bar.append('rect')
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('width', x.bandwidth())

  bar.append('text')
    .attr('x', d => x.bandwidth() / 2)
    .attr('y', d => y(d.value))
    .attr('dy', '0.75em')
    .text(d => d.value)


})
