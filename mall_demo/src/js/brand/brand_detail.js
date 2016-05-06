var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#brandDetail",
    data: {
        userdata: {},
        id: 0,
        shopinfo: {
            goods: [],
            logo: ""
        },
        is_follow: false
    },
    computed: {
        followObj: function() {
            return {
                'mui-icon-weiguanzhu': !this.is_follow,
                'mui-icon-yiguanzhu': this.is_follow
            }
        }
    },
    methods: {
        init: function() {
            this.getBrandInfo();
            this.getFocus();
        },
        getFocus: function() {
            // 获取商户是否关注
            Vue.http.get(url + 'index.php?m=Api&c=Shop&a=isConcern', {
                // app_auth_code: this.userdata.app_auth_code,
                shopId: this.id
            }).then(function(res) {
                util.console.log(res.data);
                if (res.data.status == 1) {
                    res.data.data == 1 ? this.is_follow = true : this.is_follow = false;
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        // 获取商户信息
        getBrandInfo: function() {
            Vue.http.get(url + 'index.php?m=Api&c=Shop&a=shop_info', {
                app_auth_code: this.userdata.app_auth_code,
                id: this.id
            }).then(function(res) {
                util.console.log(res.data.data)
                if (res.data.status == 1) {
                    this.shopinfo = _.mapValues(res.data.data, function(el, key) {
                        if (key == 'image') {
                            el = url + el;
                        } else if (key == 'logo') {
                            el = url + el;
                        } else if (key == 'tags') {
                            _.map(el, function(item) {
                                item.img = url + item.img;
                                return item
                            })
                        }
                        return el;
                    });
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        follow: function() {
            Vue.http.get(url + 'index.php?m=Api&c=Shop&a=concern', {
                app_auth_code: this.userdata.app_auth_code,
                shop_id: this.id
            }).then(function(res) {
                util.console.log(res.data)
                if (res.data.status == 1) {
                    this.is_follow ? this.is_follow = false : this.is_follow = true;
                    if (this.is_follow) {
                        Mui.message.toast({
                            msg: "已关注商户"
                        })
                    } else {
                        Mui.message.toast({
                            msg: "已取消关注"
                        })
                    }
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        }
    },
    created: function() {
        this.id = util.urlQuery().id;
    }
})
