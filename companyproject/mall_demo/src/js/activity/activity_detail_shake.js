new Vue({
    mixins: [Mui.vueMixinInit],

    el: '#shake',

    data: {
        activityInfo: {}
    },
    methods: {
        init: function() {
            // 初始化
            this.getInfo();
        },
        getInfo: function() {
            // 初始化数据
            Vue.http.get(url + 'index.php?m=Api&c=Active&a=shake_active', {
                mall_id: this.userdata.current_mall_id,
                id: this.id
            }).then(function(res) {
                util.console.log(res.data)
                if (res.data.status == 1) {
                    this.activityInfo = _.mapValues(res.data.data, function(el, key) {
                        if (key == "img") {
                            el = url + el;
                        }
                        return el;
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                Mui.message.toast({
                    msg: err
                })
            })
        },
        shake: function() {
            Mui.shakeInit(function() {
                // 请求摇一摇
                Vue.http.get(url + 'index.php?m=Api&c=Active&a=repeat_shake', {
                    // app_auth_code: this.userdata.app_auth_code,
                    mall_id: this.userdata.current_mall_id,
                    active_id: this.id
                }).then(function(res) {
                    util.console.log(res.data);
                    if (res.data.status == 1) {
                        //
                        Mui.message.alert({
                            msg: '您获得了优惠券' + res.data.data.name + ',请去我的优惠券查收请去我的优惠券查收'
                        })
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err) {
                    Mui.message.toast({
                        msg: err
                    })
                })
<<<<<<< HEAD
            })
            // Mui.shakeInit(function(){
            //
            // });
=======
            });
>>>>>>> abef4c52da09aaaa0c1e7a54190c573315642ae9
        }
    },
    created: function() {
        var queryObj = util.urlQuery();
        this.id = queryObj.id;
    }
})
