function init() {
  const container = document.getElementById('app')
  const data = [
    { type: 'a', x: 'a', y: 1 },
    { type: 'a', x: 'b', y: 35 },
    { type: 'a', x: 'c', y: 15 },
    { type: 'a', x: 'd', y: 5 },
    { type: 'b', x: 'b', y: 22 },
    { type: 'b', x: 'a', y: 2 },
    { type: 'b', x: 'c', y: 2 },
    { type: 'b', x: 'd', y: 31 },
  ]
  const chart = new G2.Chart({
    container,
    width: 600,
    height: 400,
  })
  chart.source(data)
  chart.scale({
    x: {
      type: 'cat',
      alias: '分类'
    },
    y: {
      type: 'linear',
      alias: '大小'
    }
  })
  chart
    .line()
    .position('x*y')
    .color('type')
    .shape('type', ['spline', 'hv'])

  // chart.coord('polar')
  chart.render()
}

init()
