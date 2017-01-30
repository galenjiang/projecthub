var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#integralInfo",
    data: {
        userdata: {},
        id: 0,
        limit: true,
        mall: null,
        infodata: {},
        commentdata: {},
        payShow: false,
        count: 1,
        shareMaskStatus: false
    },
    methods: {
        init: function(){
            // 获取礼品信息
            this.getGiftInfo();
            // 获取积分更新
            this.updateUserInfo().catch(function(err){alert(err)});
        },
        // 获取礼品数据
        getGiftInfo: function(){
            Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=getoneGift', {
                // app_auth_code: this.userdata.app_auth_code,
                id: this.id,
                limit: this.limit
            }).then(function(res) {
                if (res.data.status == 1) {
                    util.console.log(res.data.data)
                        // this.infodata
                    this.infodata = _.mapValues(res.data.data.oneGift, function(el, key) {
                        if (key == 'img') el = url + el;
                        return el;
                    })
                    this.commentdata = _.map(res.data.data.comment.list, function(el, key) {
                        if (key == 'img') {
                            el = _.map(el, function(item) {
                                item = url + item;
                                return item;
                            })
                        }
                        return el;
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
                // 微信分享
                this.shareInit();
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        openPay: function() {
            this.payShow = true;
            event.preventDefault();
        },
        closePay: function() {
            this.payShow = false;
            event.preventDefault();
        },
        minus: function() {
            if (this.count <= 1) {
                Mui.message.toast({
                    msg: '数量不能低于1件'
                })
            } else {
                this.count -= 1;
            }
        },
        plus: function() {
            this.count += 1;
        },
        pay: function() {
            //调用微信JS api 支付
            Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=commit_order', {
                // app_auth_code: this.userdata.app_auth_code,
                mall_id: this.mall || this.userdata.current_mall_id,
                order_number: this.count,
                gift_id: this.id,
                gift_name: this.infodata.name,
                type: (this.limit == 1) ? 1 : 2
            }).then(function(res) {
                if (res.data.status == 0) {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                } else if(res.data.status == 1){
                    window.location.href = url + 'index.php?m=Home&c=Integral&a=integral_change_success';
                } else if( typeof res.data == 'object' ){
                    // 调取微信支付
                    wechat.pay(res.data, function(res) {
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            window.location.href = url + 'index.php?m=Home&c=Integral&a=integral_change_success';
                        } else if (res.err_msg == 'get_brand_wcpay_request：cancel') {
                            // 不做任何事情
                        } else {
                            Mui.message.toast({
                                msg: res.err_msg
                            })
                        }
                    })
                } else {
                    throw new Error('系统错误')
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        shareInit: function() {
            var params = {
                title: '乐坊商场', // 分享标题
                desc: this.infodata.name,
                link: window.location.href + '&mall=' + this.mall || this.userdata.current_mall_id, // 分享链接
                imgUrl: this.infodata.img, // 分享图标
                success: function() {
                    Mui.message.toast({
                        msg: "分享成功"
                    })
                },
                cancel: function() {
                    Mui.message.toast({
                        msg: "系统错误"
                    })
                }
            }
            wx.onMenuShareAppMessage(params);
            wx.onMenuShareTimeline(params);
        },
        share: function(){
            this.shareMaskStatus ? this.shareMaskStatus = false : this.shareMaskStatus = true;
            event.preventDefault();
        }
    },
    created: function(){
        var queryObj = util.urlQuery()
        this.id = queryObj.id;
        this.mall = queryObj.mall;
        this.limit = queryObj.limit;
    }
})
