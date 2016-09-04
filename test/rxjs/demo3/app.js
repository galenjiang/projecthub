//// 方法一
//Rx.Observable.just('https://api.github.com/users')
//    .subscribe(function (res) {
//        Rx.Observable.create(function (observer) {
//                $.getJSON(res)
//                    .done(function (res) {
//                        observer.onNext(res)
//                    })
//                    .fail(function (err) {
//                        observer.onError(err)
//                    })
//            })
//            .subscribe(function (res) {
//                console.log(res)
//            })
//    })
//
//// 方法二
//Rx.Observable.just('https://api.github.com/users')
//    .subscribe(function (reqUrl) {
//        Rx.Observable.fromPromise($.getJSON(reqUrl))
//            .subscribe(function (res) {
//                console.log(res)
//            })
//    })


// 方法三
var startUpRequestStream = Rx.Observable.just('https://api.github.com/users')

//startUpRequestStream
//    .flatMap(function (reqUrl) {
//        return Rx.Observable.fromPromise($.getJSON(reqUrl))
//    })
//    .subscribe(function (res) {
//        console.log(res)
//    })


// 从事件获取事件流

var refreshBtn = document.querySelector('.refresh')
var requestStreamOnRefreshStream = Rx.Observable.fromEvent(refreshBtn, 'click')


// 合并一
//var requestStream = Rx.Observable.merge(startUpRequestStream, requestStreamOnRefreshStream)

//requestStream.subscribe(function (res) {
//   console.log(res)
//})


//// 合并二
//requestStreamOnRefreshStream
//    .map(function () {
//        var randomOffset = Math.floor(Math.random() * 500);
//        return 'https://api.github.com/users?since=' + randomOffset;
//    })
//    .merge(startUpRequestStream)


//// 合并二
//
//requestStreamOnRefreshStream.startWith('start up')
//    .map(function (res) {
//        var randomOffset = Math.floor(Math.random() * 500);
//        return 'https://api.github.com/users?since=' + randomOffset;
//    })
//    .subscribe(function(res){
//        console.log(res)
//    })


//// 合并二
//
//requestStreamOnRefreshStream.startWith('https://api.github.com/users')
//    .subscribe(function(res){
//        console.log(res)
//    })


var refresh = requestStreamOnRefreshStream
    .map(function () {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    })
    .merge(startUpRequestStream)
    .flatMap(function (reqUrl) {
        return Rx.Observable.fromPromise($.getJSON(reqUrl))
    })
    .map(function (listUsers) {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
    })

var deleteBtn = document.querySelector('.delete')
var delStream = Rx.Observable.fromEvent(deleteBtn, 'click')


delStream.combineLatest(refresh, function (click, listUsers) {
    console.log(click, listUsers)
    return listUsers[Math.floor(Math.random() * listUsers.length)];
})
    .subscribe(function(res){
        console.log(res)
    })
