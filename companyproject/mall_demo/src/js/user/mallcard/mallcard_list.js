var app = new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-tabs": Mui.tabs,
        "mui-coupon": Mui.coupon
    },
    el: "#app",
    data: {
        tabList: [{
            name: "当前卡券"
        }, {
            name: "历史卡券"
        }],
        couponList: [],
        index: 0,
        page: 1,
        totalpage: 1,
        allowrefresh: true
    },
    methods: {
        init: function(){
            // 初始化
            this.getList()
        },

        getList: function() {
            // 获取数据更新
            if (this.allowrefresh && this.page <= this.totalpage) {
                    this.allowrefresh = false;
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=coupon_user', {
                        // app_auth_code: this.userdata.app_auth_code,
                        status: this.index
                    }).then(function(res) {
                        this.allowrefresh = true;
                        this.page += 1;
                        this.totalpage = res.data.data.totalpage;
                        util.console.log(res.data.data.list)
                        var newCouponList = _.map(res.data.data.list, function(el) {
                            if(this.index == 0){
                                el.status = 0
                            }else{
                                if(el.is_checked == 1){
                                    el.status = 2
                                }else{
                                    el.status = 1
                                }
                            }

                            return { //当前页数据
                                img: url + el.img,
                                status: el.status,
                                url: url + 'index.php?m=Home&c=User&a=mallcard_detail&id=' + el.id
                            }
                        }.bind(this));
                        this.couponList = _.concat(this.couponList, newCouponList); //追加刷新数据
                        util.console.log(this.couponList)
                    }.bind(this)).catch(function(err) {
                        this.allowrefresh = true;
                        alert(err)
                    }.bind(this))
            }
        }
    },
    events: {
        "tab": function(index) {
            this.index = index;
            this.page = 1;
            this.totalpage = 1;
            this.couponList = [];
            this.getList();
        }
    }
})
