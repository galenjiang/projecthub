var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#app",
    components: {
        "mui-tabs": Mui.tabs
    },
    data: {
        userdata: {},
        tabList: [{
            name: "待审核"
        }, {
            name: "已通过"
        }, {
            name: "未通过"
        }],
        cur: 0,
        status: 0,
        items: [],
        page: 1,
        totalpage: 1,
        allowrefresh: true
    },
    methods: {
        init: function() {
            //获取列表
            this.getList();
            // 规则说明
            Mui.message.alert({
                msg: "规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明"
            })
        },
        getList: function() {
            util.console.log(this.status,this.page,this.totalpage);
            if (this.allowrefresh && this.page <= this.totalpage) {
                this.allowrefresh = false;
                Vue.http.get(url + 'index.php?m=Api&c=UserCard&a=receipt', {
                    card_no: this.userdata.card_no,
                    status: this.status,
                    page: this.page
                }).then(function(res) {
                    this.allowrefresh = true;
                    if (res.data.status == 1) {
                        this.page += 1;
                        this.totalpage = res.data.data.totalpage;
                        var newArr = _.map(res.data.data.list, function(el) {
                            if (this.status == 0) {
                                // 未审核
                                el.des = '待审核';
                                el.href = url + 'index.php?m=Home&c=User&a=membercard_selfhelp_detail&status=0&id=' + el.id
                                el.consume_time = new Date(el.consume_time * 1000).Format("yyyy-MM-dd");
                            } else if (this.status == 1) {
                                // 已完成
                                el.href = url + 'index.php?m=Home&c=User&a=membercard_selfhelp_detail&status=1&id=' + el.id
                                el.des = '获得积分：' + el.receipt_integral;
                                el.consume_time = new Date(el.consume_time * 1000).Format("yyyy-MM-dd");

                            } else if (this.status == 2) {
                                // 未通过
                                el.href = url + 'index.php?m=Home&c=User&a=membercard_selfhelp_detail&status=2&id=' + el.id
                                el.des = el.content;
                                el.consume_time = new Date(el.consume_time * 1000).Format("yyyy-MM-dd");
                            }
                            return el
                        }.bind(this))
                        this.items = _.concat(this.items, newArr) //数据集
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
    },
    events: {
        "tab": function(index) {
            this.status = index;
            this.page = 1;
            this.totalpage = 1;
            this.items = [];
            this.getList();
        }
    }
})
