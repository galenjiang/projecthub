var Foo = Vue.extend({
    template: '<p>This is foo!</p>',
    // route: {
    //     activate: function() {
    //         console.log(foo)
    //     }
    // }
})
var Bar = Vue.extend({
    template: '<p>This is bar!</p>',
    // route: {
    //     activate: function() {
    //         console.log(bar)
    //     }
    // }
})
var Baz = Vue.extend({
    template: '<p>This is baz!</p>',
    // route: {
    //     activate: function() {
    //         console.log(baz)
    //     }
    // }
})




// 第一页
var Page1 = Vue.extend({
    template: '<div class="page page1"><h2>page1</h2>' +
        '<ul>' +
        '<li class="nav">' +
        '<a v-link="{name: \'foo\'}">page1/foo</a>' +
        '</li>' +
        '<li class="nav">' +
        '<a v-link="{path: \'/page1/bar\'}">page1/bar</a>' +
        '</li>' +
        '</ul>' +
        '<router-view transition="fade"></router-view></div>',
    ready: function() {
        console.log(this.$route)
    },
    route: {
        activate: function(transition) {
            console.log('page1')
            transition.next()
        }
    }
})

// 第一页
var Page2 = Vue.extend({
    template: '<div class="page page2"><h2>page2 {{$route.params.userId}}</h2>' +
        '<router-view></router-view></div>',
    ready: function() {
        console.log(this.$route)
    },
    route: {
        activate: function(transition) {
            console.log('page2')
            transition.next()
        }
    }
})
