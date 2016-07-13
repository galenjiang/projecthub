var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#right",
    data: {
        userdata: {},
        rightList: [],
        canGetRightList: []
    },
    methods: {
        init: function(){
            // 获取会员卡信息合并
            Vue.http.get(url + 'index.php?m=Api&c=User&a=card_user',{
                // app_auth_code: this.userdata.app_auth_code
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data.data)
                    this.userdata = _.assign({},this.userdata,_.mapValues(res.data.data,function(el){
                        return el
                    }))
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
            // 获取权益
            this.getRight();
            // 获取可得到的权益
            this.getCanGetRight();
        },
        // 获取权益
        getRight: function(){
            Vue.http.get(url + 'index.php?m=Api&c=UserCoupon&a=couponList',{
                // app_auth_code: this.userdata.app_auth_code
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data.data)
                    this.rightList = _.map(res.data.data,function(el){
                        el.pic_path = '.' + el.pic_path;
                        return el
                    })
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        },
        // 获取可得到的权益
        getCanGetRight: function(){
            Vue.http.get(url + 'index.php?m=Api&c=UserCoupon&a=getNoCoupon',{
                // app_auth_code: this.userdata.app_auth_code
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data.data)
                    this.canGetRightList = _.map(res.data.data,function(el){
                        el.pic_path = '.' + el.pic_path;
                        return el
                    })
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        }
    }
})
