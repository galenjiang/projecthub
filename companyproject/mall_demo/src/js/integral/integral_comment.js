var app = new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-tabs": Mui.tabs
    },
    el: "#integralComment",
    data: {
        userdata: {},
        tablist: [{
            name: "图文详情"
        }, {
            name: "评价"
        } ],
        desc: '',
        commentlist: [],
        cur: 0,
        id: -1,
        limit: '',
        payShow: false,
        count: 1,
        infodata: {content: ' '}
    },
    methods: {
        init: function() {
            // 初始化
            this.getInfo();
            // 获取积分更新
            this.updateUserInfo().catch(function(err){alert(err)});
        },
        getInfo: function(){
            Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=comment_list&id=12', {
                gift_id: this.id
            }).then(function(res) {
                if (res.data.status == 1) {
                    util.console.log(res.data.data);
                    // 图文详情
                    if(res.data.data.gift_data[0]){
                        // 礼品信息
                        this.infodata = _.mapValues(res.data.data.gift_data[0],function(el, key){
                            return el
                        })
                    }
                    // 评价
                    this.commentlist = _.map(res.data.data.list,function(el){
                        el.header_url = url + el.header_url;
                        el.img = _.map(el.img,function(item){
                            item = url + item
                            return item
                        })
                        return el
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err);
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
                mall_id: this.userdata.current_mall_id,
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
                    // 积分支付成功，不需要跳转微信支付
                    window.location.href = url + 'index.php?m=Home&c=Integral&a=integral_change_success';
                } else if(typeof res.data == 'object'){
                    // 调取微信支付
                    wechat.pay(res.data, function(res) {
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            window.location.href = url + 'index.php?m=Home&c=Integral&a=integral_change_success';
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
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        }
    },
    events: {
        "tab": function(index) {
            this.cur = index;
        }
    },
    created: function(){
        var query = util.urlQuery();
        this.id = query.id;
        // tab状态
        this.cur = query.type;
        this.limit = query.limit;
    }
})
