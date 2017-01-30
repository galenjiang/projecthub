new Vue({
    mixins: [Mui.vueMixinInit],
    el: '#message_jifenList',
    data: {
        userdata: {},
        items: [],
        page: 1,
        totalpage: 1,
        allowrefreshActive: true
    },
    methods: {
        init: function() {
            // 初始化
            this.getList();
        },

        getList: function() { //滑动新增数据
            if (this.allowrefreshActive && this.page <= this.totalpage) {
                this.allowrefreshActive = false;
                Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=consult_list', {
                    userid: 13079, //临时id
                    page: this.page
                }).then(function(res) {
                    this.allowrefreshActive = true;
                    if (res.data.status == 1) { //请求成功
                        var newItems = _.map(res.data.data.list, function(el) {
                            var list = {
                                type: el.type,
                                gift_integral: el.gift_integral,
                                order_card: el.order_card,
                                order_time: el.order_time
                            }
                            var obj = {
                                    nameType: '',
                                    integral: '',
                                    orderCard: '',
                                    orderTime: ''
                                }
                                // 赋值obj
                            if (list.type == 1) {
                                obj.nameType = '积分兑换';
                                obj.integral = '-' + list.gift_integral;
                            } else if (list.type == 2) {
                                obj.nameType = '积分充值';
                                obj.integral = '+' + list.gift_integral;
                            }
                            obj.orderCard = list.order_card;
                            obj.orderTime = new Date(list.order_time * 1000).Format("yyyy-MM-dd")
                            return obj;
                        });
                        this.items = _.concat(this.items, newItems); //追加新增;
                        this.page += 1; //页数增加
                        this.totalpage = res.data.data.totalpage;
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        });
                    }
                }.bind(this)).catch(function(err) {
                    this.allowrefreshActive = true;
                    alert(err)
                }.bind(this))
            }
        }
    }
})
