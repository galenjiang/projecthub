new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-banner": Mui.banner,
        "mui-show-picture": Mui.showPiture
    },
    el: "#app",
    data: {
        userdata: {},
        bannerList: [],
        activityList: [],
        menuShow: false,
        mall: 0,
        loading: false,
        page: 1,
        totalpage: 1
    },
    methods: {
        init: function() {
            // 获取banner数据
            this.getBannerList();
            // 获取活动列表
            this.getActivityList();
        },
        tabMenu: function(e) {
            this.menuShow ? this.menuShow = false : this.menuShow = true;
            e.preventDefault();
        },
        collapseMenu: function(e) {
            this.menuShow = false;
            e.preventDefault();
        },
        tap: function() {
            Mui.message.toast({
                msg: "敬请期待"
            })
        },
        // 获取banner数据
        getBannerList: function(){
            Vue.http.get(url + 'index.php?m=Api&c=Mall&a=mallIndex', {
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                this.loading = false;
                if (res.data.status == 1) {
                    // 获取banner
                    this.bannerList = _.map(res.data.data.banner, function(el) {
                            el.img = url + el.img;
                            return el
                        })
                        // swipe
                    this.$nextTick(function() {
                        Swipe(document.getElementById('slider'), {
                            auto: 3000,
                            continuous: true,
                            transitionEnd: function(index) {
                                var inds = document.querySelectorAll('.indicator');
                                for (var i = 0; i < inds.length; i++) {
                                    inds[i].classList.remove('active')
                                }
                                inds[index % (inds.length)].classList.add('active')
                            }
                        });
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
        // 获取活动数据
        getActivityList : function(){
            if(!this.loading && this.page <= this.totalpage){
                // 获取活动列表
                this.loading = true;
                Vue.http.get(url + 'index.php?m=Api&c=Active&a=active_list', {
                    mall_id: this.userdata.current_mall_id,
                    page: this.page
                }).then(function(res) {
                    this.loading = false;
                    if (res.data.status == 1) {
                        this.totalpage = res.data.data.totalpage; //更新页数
                        this.page += 1; //页数增加
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
                        });
                        this.activityList = _.concat(this.activityList,newList);
                    }else{
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err){
                    this.loading = false;
                    alert(err)
                }.bind(this))
            }
        }
    }

})
