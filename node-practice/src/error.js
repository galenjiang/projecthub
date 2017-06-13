// const a = (cb) => {
//   // const e = new Error('error in a')
//   const e = 1
//   cb(e)
// }
// const b = () => {
//   // setTimeout(() => {
//     a((e) => {
//       // console.log(typeof e)
//       throw e
//       // try{e}catch(e){throw e}
//     })
//   // })


// }
// const c = () => {
//   b()
// }

// const d = () => {
//   c()
// }


// try{
// d()

// }catch(e){console.log('catching.......', e)}


const a = (cb) => {
  const e = new Error('error in a')
  // const e = 1
  cb(e)
}
const b = () => {
  // setTimeout(() => {
    a((e) => {
      // console.log(typeof e)
      throw e
      // try{e}catch(e){throw e}
    })
  // })
}

// const a = (a) => {
//   console.log(a)
// }
for(var i = 0; i < 1; i++) {setTimeout(b, 1000, new Error(i))}
