const sortByBuble = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      let temp = arr[j + 1]
      if (arr[j] > arr[j + 1]){
        arr[j + 1] = arr[j]
        arr[j] = temp
      }else{
        // do nothing
      }
    }
  }
  return arr
}
const newArr = sortByBuble([11,5,2,3])
console.log(newArr)
