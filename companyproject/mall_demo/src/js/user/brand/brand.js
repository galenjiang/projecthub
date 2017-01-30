new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#brand",
    data: {
        userdata: {},
        list: [],
        page: 1,
        totalpage: 1,
        allowrefresh: true
    },
    methods: {
        init: function(){
            this.getList();
        },
        getList: function(){
                if(this.allowrefresh && this.page <= this.totalpage){
                    this.allowrefresh = false;
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=shopFollow',{
                        // app_auth_code: this.userdata.app_auth_code,
                        page: this.page
                    }).then(function(res){
                        util.console.log(res.data.data);
                        this.totalpage = res.data.data.totalpage;
                        this.page += 1;
                        if(res.data.status == 1){
                            var newList = _.map(res.data.data.list, function(el){
                                el.url = url + 'index.php?m=Home&c=Brand&a=brand_detail&id=' + el.shop_id;
                                el.logo = url + el.logo;
                                el.tags = _.map(el.tags, function(item){
                                    item.img = url + item.img;
                                    return item
                                })
                                return el;
                            });
                            this.list = _.concat(this.list, newList);

                        }else{
                            Mui.message.toast({
                                msg: res.data.info
                            })
                        }
                        this.allowrefresh = true;
                    }.bind(this)).catch(function(err){
                        this.allowrefresh = true;
                        alert(err)
                    }.bind(this))
                }
        }
    }
})
