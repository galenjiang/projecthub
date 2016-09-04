new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#setting_suggest_list",
    data: {
        userdata: {},
        items: [],
        page: 1,
        totalpage: 1,
        allowrefresh: true
    },
    methods: {
        init: function() {
            this.getList()
        },
        getList: function() {
            if (this.allowrefresh && this.page <= this.totalpage) {
                this.allowrefresh = false;
                Vue.http.get('./index.php?m=Api&c=Mall&a=feedback', {
                    // app_auth_code: this.userdata.app_auth_code
                }).then(function(res) {
                    if (res.data.status == 1) {
                        var addItems = _.map(res.data.data.list, function(el) {
                            var newList = {
                                time: el.createtime,
                                title: el.title,
                                url: '.' + '/index.php?m=Home&c=User&a=setting_suggest_detail&id=' + el.id
                            }
                            return newList;
                        })
                        this.items = _.concat(addItems, this.items); //追加新增
                        this.page++; //页数增加
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                    this.allowrefresh = true;
                }.bind(this)).catch(function(err){
                    this.allowrefresh = true;
                    alert(err) //error
                }.bind(this))
            }
        }
    }
})
