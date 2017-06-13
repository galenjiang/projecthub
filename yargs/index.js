const yargs = require('yargs')
const argv = yargs
  // .option('user')
  .coerce('user', opt => {
    opt.name = opt.name.toLowerCase()
    opt.password = '[SECRET]'
    return opt
  })
  .argv

console.log(argv)
