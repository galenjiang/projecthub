var router = new VueRouter();

router.map({
    '/page1':{
        component: Page1,
        auth: true,
        subRoutes: {
            '/foo': {
                component: Foo,
                name: 'foo'
            },
            '/bar':{
                component: Bar
            }
        }
    },
    '/page2/:userId':{
        component: Page2,
        name: 'page2',
        subRoutes: {
            '/':{
                component: Baz
            }
        }
    }
})

router.start(App, '#app')

// router.beforeEach(function (transition) {
//     console.log(transition.to.auth)
// })
