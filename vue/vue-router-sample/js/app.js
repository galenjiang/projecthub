// 定义组件
var Foo = Vue.extend({
    template: '<div class="foo">' +
      '<h2>This is Foo!</h2>' +
       '<p>' +
                '<a v-link="{ path: \'/foo/bar\' }">Go to Bar</a>' +
                '<a v-link="{ path: \'/foo/baz\' }">Go to Baz</a>' +
                '<a v-link="{ path: \'/baz\' }">Go to Baz</a>' +
      '</p>' +
      '<router-view></router-view>' + // <- 嵌套的外链
    '</div>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>' +
    '<p>路径：{{$route.path}}</p>' +
    '<p>验证：{{$route.auth}}</p>',
    created: function(){
        // alert(this.$route.auth)
    }
})

var Baz = Vue.extend({
    template: '<p>This is baz!</p>' + 
    '<p>路径：{{$route.path}}</p>' +
    '<p>验证：{{$route.auth}}</p>',
    created: function(){
        // alert(this.$route.auth)
    }
    
})

var Auth = Vue.extend({
    template: '<p>验证</p>' +
    '<p>' +
            '<a v-link="{ path: \'/auth/bar\' }">Go to auth/bar</a>' +
            '<a v-link="{ path: \'/auth/baz\' }">Go to auth/baz</a>' +
            '<a v-link="{ path: \'/auth/auth\' }">Go to auth/auth</a>' +
    '</p>' +
    '<router-view></router-view>',
    created: function(){
        // alert(this.$route.auth);
    }
})

var Page = Vue.extend({
    template: '<h1>{{$route.params.pageNum}}</h1>'
})

// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({
    el: "#app"
})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/foo': {
        component: Foo,
        subRoutes: {
            '/bar': {
                component: Bar
            },
            '/baz': {
                component: Baz
            },
            '/:pageNum': {
                name: 'page',
                component: Page
            },
        }
    },
    '/bar': {
        component: Bar
    },
    '/auth': {
        component: Auth,
        auth: true,
        subRoutes: {
            '/bar': {
                component: Bar
            },
            '/baz': {
                component: Baz
            },
            '/auth': {
                component: Auth
            }
        }
    }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')