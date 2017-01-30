new Vue({
    mixins: [Mui.vueMixinInit],
    el: '#message_detailList',
    data: {
        userdata: {},
        items: [],
        page: 1,
        totalpage: 1,
        allowrefresh: true
    },
    methods: {
        init: function() {
            // 初始化
            this.getList();
        },
        getList: function() {
            if (this.allowrefresh && this.page <= this.totalpage) {
                this.allowrefresh = false;
                Vue.http.get(url + 'index.php?m=Api&c=mall&a=mall_xiaoxi', {
                    mall_id: this.userdata.current_mall_id,
                    page: this.page
                }).then(function(res) {
                    this.allowrefresh = true;
                    if (res.data.status == 1) {
                        var getData = res.data.data.list; //新增请求数据
                        var newItems = _.map(getData, function(el) {
                            var list = {
                                title: el.title,
                                img: url + el.img,
                                url: url + 'index.php?m=Home&c=Message&a=message_detail&id=' + el.id,
                                about: el.about
                            }
                            return list;
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
                    this.allowrefresh = true;
                    alert(err)
                }.bind(this))
            }
        }
    }
})
