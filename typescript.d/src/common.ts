// interface InterfaceHello {
//   (msg: string): void
// }
/// <reference path="../typings/types.d.ts" />

const hello: InterfaceHello  = (msg) => {
  console.log(`hello${msg}`)
}
export default hello
