var app = new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-switch": Mui.switch
    },
    el: "#app",

    data: {
        name: '',
        mobile: '',
        permoney: 0,
        people: 1,
        discount: '',
        switchStatus: true,
        radio: 1,
        activityInfo: {},
        id: null
    },

    computed: {
        leftScore: function(){
            return this.userdata.integral - this.discount;
        },
        dismoney: function(){
            return (this.discount*this.radio).toFixed(2)
        },
        shouldpay: function(){
            if(!this.permoney){
                this.permoney = 0
            }
            if(!this.people){
                this.people = 0
            }
            if(!this.permoney){
                this.permoney = 0
            }
            if(!this.discount){
                this.discount = 0
            }
            if(!this.radio){
                this.radio = 0
            }
            // util.console.log('permoney:'+ this.permoney,'people:'+ this.people,'discount:'+ this.discount,'radio:'+ this.radio)
            return (this.permoney*parseInt(this.people) - parseFloat(this.discount)*parseFloat(this.radio)).toFixed(2)
        }
    },

    methods: {
        init: function(){
            //获取积分抵扣
            this.getRadio();
            // 获取活动信息
            this.getActivityInfo();
            // 获取积分更新
            this.updateUserInfo().catch(function(err){alert(err)});
        },
        disSwitch: function(msg){
            if(!msg){
                this.discount = '';
            }
            this.switchStatus = msg;
        },
        // 获取积分比例
        getRadio: function(){
            Vue.http.get(url + 'index.php?m=Api&c=Mall&a=mallIntegralRule',{
                // app_auth_code: this.userdata.app_auth_code
            }).then(function(res){
                util.console.log(res.data)
                if(res.data.status == 1){
                    this.radio = res.data.data;
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        },
        // 获取活动信息
        getActivityInfo: function(){
            Vue.http.get(url + 'index.php?m=Api&c=Active&a=booking_active',{
                mall_id: this.userdata.current_mall_id,
                id: this.id
            }).then(function(res){
                if(res.data.status == 1){
                    // 每人需要交多少money
                    util.console.log(res.data.data);
                    this.activityInfo = _.mapValues(res.data.data,function(el){
                        return el;
                    })
                    this.permoney = res.data.data.can_pay_many;
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        },
        // 提交验证
        join: function(){
            if(this.leftScore < 0){
                Mui.message.toast({
                    msg: '积分不足'
                })
                return false;
            }else if(this.shouldpay < 0){
                Mui.message.toast({
                    msg: '积分抵扣超出需要的金额'
                })
                return false;
            } else {
                var sendObj = {};
                _.forEach(this.activityInfo.countent,function(el){
                    sendObj[el.id] = el.value;
                })
                // console.log({
                //     app_auth_code: this.userdata.app_auth_code,
                //     mall_id: this.userdata.current_mall_id,
                //     active_id: this.id,
                //     content: content,
                //     discount_integral: this.discount,
                //     repeat_people: this.people
                // })

                util.console.log(this.activityInfo.countent)
                Vue.http.get(url + 'index.php?m=Api&c=Active&a=repeat_booking',{
                    // app_auth_code: this.userdata.app_auth_code,
                    mall_id: this.userdata.current_mall_id,
                    active_id: this.id,
                    content: sendObj,
                    discout_integral: this.discount,
                    repeat_people: this.people
                }).then(function(res){
                    util.console.log(res.data);
                    if(res.data.status == 0){
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }else if(res.data.status == 1){
                        window.location.href = url + 'index.php?m=Home&c=Activity&a=activity_payment_success';
                    }else if(typeof res.data == 'object'){
                        // 调取微信支付
                        wechat.pay(res.data, function(res) {
                            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                                window.location.href = url + 'index.php?m=Home&c=Activity&a=activity_payment_success';
                            } else if (res.err_msg == 'get_brand_wcpay_request：cancel') {
                                // 不做任何事情
                            } else {
                                Mui.message.toast({
                                    msg: "支付失败,请稍后再试"
                                })
                            }
                        })
                    }else{
                        throw new Error('系统错误')
                    }
                }.bind(this)).catch(function(err){
                    alert(err)
                })
            }

        }
    },

    created: function(){
        var queryObj = util.urlQuery();
        this.id = queryObj.id;
    }
})
