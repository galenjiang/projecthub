var app = new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-screen": Mui.screen,
        "mui-show-pic": Mui.showPiture
    },
    el: "#app",
    data: {
        userdata: {},
        screenList: [{
            name: "楼层"
        }, {
            name: "分类"
        }, {
            name: "排序"
        }],
        cur: -1,
        floorList: [],
        catalogList: [],
        shopList: [],
        totalpage: 1,
        page: 1,
        floor: '',
        category: '',
        sort: '',
        allowrefresh: true
    },
    methods: {
        init: function() {
            // 楼层
            this.getFloorList();
            // 分类
            this.getCateList();
            // 获取商户列表
            this.getShopList()
        },
        // 获取分类列表
        getCateList: function() {
            // 获取类别
            Vue.http.get(url + 'index.php?m=Api&c=Mall&a=category', {
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                util.console.log(res.data);
                if (res.data.status == 1) {
                    this.catalogList = _.map(res.data.data, function(el) {
                        return {
                            id: el.id,
                            name: el.name,
                            logo_pic: url + el.logo_pic
                        }
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        // 获取楼层列表
        getFloorList: function() {
            Vue.http.get(url + 'index.php?m=Api&c=Mall&a=floorList', {
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                if (res.data.status == 1) {
                    this.floorList = res.data.data;
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },
        floorSearch: function(id) {
            this.shopList = [];
            this.floor = id;
            this.page = 1;
            this.totalpage = 1;
            this.getShopList();
            this.collapseMenu();
            event.preventDefault();
        },
        cateSearch: function(id) {
            this.shopList = [];
            this.category = id;
            this.page = 1;
            this.totalpage = 1;
            this.getShopList();
            this.collapseMenu();
            event.preventDefault();
        },
        sortSearch: function(id) {
            this.shopList = [];
            this.sort = id;
            this.page = 1;
            this.totalpage = 1;
            this.getShopList();
            this.collapseMenu();
            event.preventDefault();
        },
        getShopList: function() {
            if (this.allowrefresh && this.page <= this.totalpage) {
                this.allowrefresh = false;
                Vue.http.get(url + 'index.php?m=Api&c=Shop&a=shop_list', {
                    mall_id: this.userdata.current_mall_id,
                    floor: this.floor,
                    category: this.category,
                    sort: this.sort,
                    page: this.page
                }).then(function(res) {
                    this.allowrefresh = true;
                    if (res.data.status == 1) {
                        this.page += 1;
                        this.totalpage = res.data.data.totalpage;
                        var newShopList = _.map(res.data.data.list, function(el, index) {
                            return {
                                url: url + "index.php?m=Home&c=Brand&a=brand_detail&id=" + el.id,
                                img: url + el.image,
                                textUpper: el.name,
                                textLower: 'L' + el.floor + ' ' + el.house_number
                            }
                        });
                        this.shopList = _.concat(this.shopList, newShopList)
                        util.console.log(res.data.data, this.data);
                    } else {
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err) {
                    this.allowrefresh = true;
                    alert(err);
                }.bind(this))

            }
        },
        // 收起菜单
        collapseMenu: function() {
            var items = Array.prototype.slice.call(this.$el.querySelectorAll('.mui-screen-item'))
            _.forEach(items, function(el) {
                el.classList.remove('show')
            })
            this.cur = -1;
        }
    }
})
