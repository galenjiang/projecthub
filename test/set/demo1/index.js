var set = new Set([NaN,null, undefined,NaN,null,undefined,{},{}])
//console.log(set.entries())
for (x in set) {
    console.log(x);
}