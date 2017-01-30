var state = {
    count: 0
};
var mutations = {
    INCREASE: function(state, amount){
        state.count = state.count + amount
    },
    DECREASE: function(state, amount){
        state.count = state.count - amount
    }
};
var store = new Vuex.Store({
    state,
    mutations
})
