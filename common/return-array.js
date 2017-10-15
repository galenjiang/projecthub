let b = null
const a = () => {
  arr = [1,2,3]
  b = arr
  return arr
}
a()[0] = 0
console.log(b)
