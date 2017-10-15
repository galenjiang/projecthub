const YC = fnCurry => {
  // 1. magic(fnCurry) 为 解除 curry 效果
  // 2. magic(fnCurry)  === arg => fnCurry(magic(fnCurry))(arg)
  // 3. magic => fnCurry => arg => fnCurry(magic(fnCurry))(arg)
  // 4. magicComp => (magicComp, fnCurry) => arg => fnCurry(magicComp(magicComp, fnCurry))(arg)
  // 5. 移除fnCurry, magicComp成为非纯函数, 不重要了
  const magicComp = magicComp => arg => fnCurry(magicComp(magicComp))(arg)

  // til step 4
  // return arg => fnCurry(magicComp(magicComp, fnCurry))(arg)
  return magicComp(magicComp)
}

// curry化函数
const factorialCurry = self => n => {
  if (n <= 0) {
    return 1
  } else {
    return n * self(n - 1)
  }
}

const factorial = YC(factorialCurry)
console.log(factorial(10))
