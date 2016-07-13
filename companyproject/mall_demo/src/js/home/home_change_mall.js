var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: '#home_change_mall',
    data: {
        items: {}
    },
    methods: {
        init: function() {
            this.getMallList();
        },
        // 获取商场列表
        getMallList: function() {
            Vue.http.get(url + 'index.php?m=Api&c=Mall&a=mallList', {}).then(function(res) {
                if (res.data.status == 1) {
                    this.items = res.data.data; //数据集
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(JSON.stringify(err))
            })
        },
        changeMall: function(msg, mall) {
            this.userdata.current_mall_id = msg;
            localStorage.userdata = JSON.stringify(this.userdata);
            window.location.href = url + 'index.php?m=Home&c=Home&a=home';
        }
    }
})
