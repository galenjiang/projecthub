Vue.config.debug = true;
var App = Vue.extend({
    data: function() {
        return {
            store: null,
            title: 'vue-router'
        }
    },
    methods: {

    },
    beforeCompile: function() {

    },
    store: store,
    vuex: {
        actions: {
            increase: increase,
            decrease: decrease
        },
        getters: {
            count: count
        }
    }
})
