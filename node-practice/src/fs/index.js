const fs = require('fs')
const path = require('path')

fs.rmdir(path.join(__dirname, 'rm'), (err, stat) => {
  if (err) {
    console.log(err)
  } else {
    conso.log(stat)
  }
})
