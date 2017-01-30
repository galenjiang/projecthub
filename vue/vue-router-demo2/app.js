// 创建一个对象来保存应用启动时的初始状态
var state = {
    // TODO: 放置初始状态
    count: 0
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
var mutations = {
    // TODO: 放置我们的状态变更函数
    INCREASE: function(state, amount) {
        if (state.count < 10) {
            state.count = state.count + amount
        }
    },
    DECREASE: function(state, amount) {
        if (state.count > 0) {
            state.count = state.count + amount
        }
    }

}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
var store = new Vuex.Store({
    state: state,
    mutations: mutations
})



// actions
incrementCounter = function(store, num) {
    store.dispatch('INCREASE', num)
}

decrementCounter = function(store, num) {
    store.dispatch('DECREASE', -num)
}



// getters
function getCount(state) {
    return state.count
}


var app = Vue.extend({
    data: function() {
        // return {
        //     count: 0
        // }
    },
    ready: function() {},
    store: store,
    vuex: {
        getters: {
            count: getCount
        }
    }
})

var Foo = Vue.extend({
    template: '<p>This is foo!</p><button @click="decrease(2)">-1</button> <button @click="increase(2)">+1</button>',
    methods: {},
    route: {
        canActivate: function(transition) {
            console.log('canActivate')
            transition.next()
        },
        activate: function(transition) {
            console.log('activate')
            transition.next()
        },
        data: function(transition) {
            console.log('data', transition)
            transition.next()
        },

        // deactivate: function(transition) {
        //     console.log('deactivate')
        //     // transition.next()
        // },
        //
        // canDeactivate: function() {
        //     console.log('canDeactivate')
        // },
        // canReuse: function() {
        //     console.log('canReuse')
        // }
    },
    store: store,
    vuex: {
        actions: {
            increase: incrementCounter,
            decrease: decrementCounter
        }
    }
})

var Bar = Vue.extend({
    template: '<p>This is Bar!</p><button @click="decrease">-1</button> <button @click="increase">+1</button>',
    methods: {},
    store: store,
    vuex: {
        actions: {
            increase: incrementCounter,
            decrease: decrementCounter
        }
    }
})

var router = new VueRouter({
    hashbang: true,
    history: false
})

// 路由定义
router.map({
    '/foo': {
        name: 'foo',
        component: Foo
    },
    '/bar': {
        name: 'bar',
        component: Bar
    }
})

// 全局设定钩子
// router.beforeEach(function(transition) {
//     // console.log(transition.to)
//     transition.next()
// })


router.start(app, '#app')
