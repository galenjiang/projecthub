var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#orderWaiting",
    components: {
        "mui-tabs": Mui.tabs
    },
    data: {
        userdata: {},
        tablist: [{
            name: "待领取"
        }, {
            name: "已完成"
        }, {
            name: "已取消"
        }],
        status: 0,
        list: [],
        page: 1,
        totalpage: 1,
        loading: false
    },
    methods: {
        init: function() {
            this.getList();
        },

        getList: function() {
            if (!this.loading && this.page <= this.totalpage) {
                // 获取礼品订单
                Vue.http.get(url + 'index.php?m=Api&c=UserOrder&a=integalorder', {
                    // app_auth_code: this.userdata.app_auth_code,
                    page: this.page,
                    status: this.status + 1
                }).then(function(res) {
                    util.console.log(res.data)
                    if (res.data.status == 1) {
                        this.page += 1;
                        this.totalpage = res.data.data.totalpage;
                        var newlist = _.map(res.data.data.list, function(el) {
                            switch (this.status) {
                                case 0:
                                    el.type = "待领取";
                                    break;
                                case 1:
                                    el.type = "已完成";
                                    break;
                                case 2:
                                    el.type = "已取消";
                                    break;
                                default:
                                    el.type = '系统错误'
                            }
                            el.commentUrl = url + 'index.php?m=Home&c=User&a=order_comment&id=' + el.id;
                            return el
                        }.bind(this))
                        this.list = _.concat(this.list, newlist);
                    } else {
                        Mui.message.toast({
                            msg: res.data
                        })
                    }
                }.bind(this)).catch(function(err) {
                    alert(err)
                })
            }

        },

        cancel: function(id) {
            util.console.log(id);
            Vue.http.get(url + 'index.php?m=Api&c=UserOrder&a=resetOrder',{
                order_card: id
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data);
                    this.page = 1;
                    this.totalpage = 1;
                    this.getList();
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this))

        }
    },
    events: {
        "tab": function(index) {
            this.status = index;
        }
    },
    watch: {
        'status': function() {
            this.page = 1;
            this.totalpage = 1;
            this.init();
        }
    }
})
