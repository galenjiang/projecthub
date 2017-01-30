new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-show-picture": Mui.showPiture
    },
    el: "#app",
    data: {
        userdata: {},
        activityList: [],
        page: 1,
        totalpage: 1,
        allowrefresh: true
    },
    methods: {
        init: function() {
            this.getActivityList();
            this.updateUserInfo();
        },
        getActivityList: function() { // 滑动新增数据
            if (this.allowrefresh && this.page <= this.totalpage) {
                this.allowrefresh = false;
                Vue.http.get(url + 'index.php?m=Api&c=Active&a=active_list', {
                    mall_id: this.userdata.current_mall_id,
                    page: this.page
                }).then(function(res) {
                    if (res.data.status == 1) {
                        util.console.log(res.data.data)
                        var newList = _.map(res.data.data.list, function(el) {
                            var list = {
                                img: url + el.img,
                                textUpper: el.active_name,
                                textLower: el.begin_time + '-' + el.end_time
                            }
                            switch (el.type) {
                                case 'public':
                                    list.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_original&id=' + el.id;
                                    break;
                                case 'booking':
                                    list.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_join&id=' + el.id;
                                    break;
                                case 'shake':
                                    list.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_shake&id=' + el.id;
                                    break;
                                default:
                                    list.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_original&id=' + el.id;
                            }
                            return list;
                        })
                        this.activityList = _.concat(newList, this.activityList); //追加新增
                        this.page += 1; //页数增加
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                    this.allowrefresh = true;
                }.bind(this)).catch(function(res) {
                    util.console.log(res.data)
                    this.allowrefresh = true;
                })
            }
        }
    },
    beforeCompile: function() {},
    ready: function() {}
})
