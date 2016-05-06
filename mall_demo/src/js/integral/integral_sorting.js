new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-countdown": Mui.countDown
    },
    el: "#app",
    data: {
        userdata: {},
        list: {},
        id: 0,
        type: '',
        page: 1,
        totalpage: 1,
        allowrefresh: true,
        time: 0
    },
    methods: {
        init: function() {
            this.getList();
        },
        // 获取列表
        getList: function(){
            util.console.log(this.allowrefresh,this.page <= this.totalpage)
            if(this.allowrefresh && this.page <= this.totalpage){
                this.allowrefresh = false;
                var uri = '';
                if (this.weight == 99) {
                    uri = url + 'index.php?m=Api&c=IntegralGift&a=getGift'
                } else {
                    uri = url + 'index.php?m=Api&c=IntegralGift&a=class_list'
                }
                Vue.http.get(uri, {
                    // app_auth_code: this.userdata.app_auth_code,
                    mall_id: this.userdata.current_mall_id,
                    is_exchange: 1,
                    class_id: this.id,
                    page: this.page
                }).then(function(res) {
                    this.allowrefresh = true;
                    util.console.log(res.data.data);
                    if (res.data.status == 1) {
                        this.totalpage = res.data.data.totalpage;
                        var newlist = _.map(res.data.data.list, function(el) {
                            el.coverimg = url + el.coverimg;
                            el.endtime = Number(el.endtime);
                            if (this.weight == 99) {
                                el.href = url + 'index.php?m=Home&c=Integral&a=integral_info&limit=1&id=' + el.id
                            } else {
                                el.href = url + 'index.php?m=Home&c=Integral&a=integral_info&limit=0&id=' + el.id
                            }
                            return el;
                        }.bind(this))
                        this.list = _.concat(this.list,newlist);
                        this.page += 1;
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err) {
                    this.allowrefresh = true;
                    alert(err)
                })
            }
        }
    },
    created: function() {
        var query = util.urlQuery();
        // 获取列表 id为99是限时
        this.id = query.id;
        this.weight = query.weight;
        this.type = decodeURIComponent(query.name);
    }
})
