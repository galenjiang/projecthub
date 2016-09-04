var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: '#membercard_charge',
    data: {
        userdata: {},
        list: {},
        listNum: '',
        chargeId: -1,
        bannerList: []
    },
    methods: {
        init: function() {
            this.getIntegralChargeList();
            this.getBannerList();
        },
        // 获取积分充值列表
        getIntegralChargeList: function(){
            Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=getintegralcz&=1', {
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                if (res.data.status == 1) {
                    util.console.log(res.data.data);
                    this.list = _.map(res.data.data, function(el) {
                        return el;
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        // 获取banner
        getBannerList: function() {
            Vue.http.get(url + 'index.php?m=Api&c=Banner&a=adver', {
                place: 3,
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                if (res.data.status == 1) {
                    this.bannerList = _.map(res.data.data, function(el) {
                            el.img = url + el.img;
                            return el
                        })
                        // swipe
                    this.$nextTick(function() {
                        Swipe(document.getElementById('slider'), {
                            auto: 3000,
                            continuous: true
                        });
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },

        chargeType: function(id) {
            this.chargeId = id;
        },

        pay: function() {
            if(this.chargeId == -1){
                Mui.message.toast({
                    msg: "请选择积分充值"
                })
                return false;
            }
            //调用微信JS api 支付
            Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=comment_integral_order', {
                // app_auth_code: this.userdata.app_auth_code,
                mall_id: this.userdata.current_mall_id,
                id: this.chargeId
            }).then(function(res) {
                if (res.data.status == 0) {
                    // 错误
                    Mui.message.toast({
                        msg: "请选择积分充值"
                    })
                } else if(typeof res.data  == 'object'){
                    // 调取微信支付
                    wechat.pay(res.data, function(res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            window.location.href = url + 'index.php?m=Home&c=User&a=membercard_charge_success';
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            // 取消
                        } else {
                            Mui.message.toast({
                                msg: "付款失败，请稍后再试"
                            })
                        }
                    })
                }else{
                    throw new Error("系统错误")
                }
            }.bind(this)).catch(function(err) {
                alert(err);
            })
        }
    }
})
