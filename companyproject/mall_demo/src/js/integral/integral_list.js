var page = new Vue({
    mixins: [Mui.vueMixinInit],

    components: {
        "mui-tabs--implict": Mui.tabsImplict,
        "mui-countdown": Mui.countDown,
        "mui-banner": Mui.banner
    },

    el: "#app",

    data: {
        userdata: {},
        tablists: [{
            name: "全部礼品"
        }, {
            name: "我能兑换"
        }],
        tabCur: 0,
        class: 0,
        page: 1,
        totalpage: 1,
        allowrefresh: true,
        catelogList: [],
        giftList: []
    },

    computed: {
        catelogStyleObj: function() {
            return {
                width: this.catelogList.length * 1.8 + 'rem'
            }
        }
    },

    watch: {
        'tabCur': function(val, oldVal) {
            this.page = 1;
            this.totalpage = 1;
            this.giftList = [];
            this.getGiftList();
        }
    },

    methods: {
        init: function() {
            // 获取礼品分类
            this.getCateList();
            // 获取礼品列表
            this.getGiftList();
        },

        getCateList: function() {
            // 获取礼品分类列表
            Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=giftClass', {
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                util.console.log(res.data.data);
                if (res.data.status == 1) {
                    this.catelogList = _.map(res.data.data, function(el) {
                        el.img = url + el.img;
                        // id分类 99为限时抢购
                        el.href = url + 'index.php?m=Home&c=Integral&a=integral_sorting&id=' + el.id + '&name=' + el.name + '&weight=' + el.weight;
                        return el;
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            });
        },

        getGiftList: function() {
            // 获取礼品列表
            if (this.allowrefresh && this.page <= this.totalpage) {
                this.allowrefresh = false;
                Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=gift_list', {
                    // app_auth_code: this.userdata.app_auth_code,
                    mall_id: this.userdata.current_mall_id,
                    is_exchange: this.tabCur + 1,
                    page: this.page
                }).then(function(res) {
                    this.allowrefresh = true;
                    if (res.data.status == 1) {
                        util.console.log(res.data.data);
                        this.loading = false;
                        this.totalpage = res.data.data.totalpage;
                        this.page += 1;
                        var newList = _.map(res.data.data.list, function(el) {
                            el.img = url + el.coverimg;
                            el.endtime = Number(el.endtime);
                            if (el.numbers) {
                                el.url = url + 'index.php?m=Home&c=Integral&a=integral_info&limit=1&id=' + el.id
                            } else {
                                el.url = url + 'index.php?m=Home&c=Integral&a=integral_info&limit=0&id=' + el.id
                            }
                            return el;
                        })
                        this.giftList = _.concat(this.giftList, newList);
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err) {
                    this.allowrefresh = true;
                    alert(err)
                }.bind(this));
            }
        }
    }
})
