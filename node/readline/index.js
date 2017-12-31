const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>'
})

rl.prompt()

rl.on('line', (input) => {
  process.stdout.write(`receive1: ${input}\n`)
  process.stdout.write(`receive2: ${input}\n`)
  process.stdout.write(`receive3: ${input}`)
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0)
  // process.stdout.write(`receive4: ${input}\n`)
  // rl.prompt()
  // console.log()
})


// rl.on('SIGCONT', () => {
//   // `prompt` will automatically resume the stream
//   rl.prompt(true);
//   // console.log('sigcont')
// });

