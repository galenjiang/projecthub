new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#userCenter",
    data: {
        userdata: {}
    },
    methods: {
        init: function() {
            // 获取用户详细信息
            this.updateUserInfo();
        }
    }
})
