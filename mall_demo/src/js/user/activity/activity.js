var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#app",
    components: {
        "mui-tabs": Mui.tabs
    },
    data: {
        tabList: [{
            name: "未开始"
        }, {
            name: "进行中"
        }, {
            name: "已结束"
        }],
        type: "notStarted",
        activityList: [],
        page: 1,
        totalpage: 1,
        loading: false
    },
    methods: {
        init: function() {
            // 初始化
            this.getList();
        },

        getList: function() {
            if(!this.loading && this.page <= this.totalpage){
                this.loading = true;
                Vue.http.get(url + 'index.php?m=Api&c=UserActive', {
                    // app_auth_code: this.userdata.app_auth_code,
                    a: this.type
                }).then(function(res) {
                    this.loading = false;
                    util.console.log(res.data);
                    if (res.data.status == 1) {
                        //
                        var newList = _.map(res.data.data.list,function(el){
                            el.thumbimg = url + el.thumbimg;
                            switch (el.type) {
                                case 'public':
                                    el.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_original&id=' + el.active_id;
                                    break;
                                case 'booking':
                                    el.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_join&id=' + el.active_id;
                                    break;
                                case 'shake':
                                    el.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_shake&id=' + el.active_id;
                                    break;
                                default:
                                    el.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_original&id=' + el.active_id;
                            }
                            return el;
                        })
                        this.activityList = _.concat(this.activityList, newList)
                        this.page += 1;
                        this.totalpage = res.data.data.totalpage;
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err){
                    this.loading = false;
                    alert(err)
                })
            }
        }
    },

    events: {
        "tab": function(msg) {
            switch (msg) {
                case 0:
                    this.type = "notStarted";
                    break;
                case 1:
                    this.type = "ongoing";
                    break;
                case 2:
                    this.type = "finish";
                    break;
                default:
                    this.type = ""
            }
            this.page = 1;
            this.totalpage = 1;
            this.activityList = [];
            this.getList();
        }
    }
})
