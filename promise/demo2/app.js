function a() {
    return new Promise(function (resolve, reject) {
        resolve('a fullfill')
        //reject('a run error')
    });
}
function b() {
    return new Promise(function (resolve, reject) {
        resolve('b fullfill')
    });
}
function c() {
    return new Promise(function (resolve, reject) {
        resolve('c fullfill')
    });
}

/**
 *
 */

a()
    .then(function (res) {
        console.log(res)
        return b()
    })
    .then(function (res) {
        console.log(res)
    }).catch(function(err){
        console.log(err)
})

/*
*
* */
a()
    .then(function(res){
        console.log(res)
        return Promise.all([b(),c()])
    }).then(function(res){
    console.log(res)
})