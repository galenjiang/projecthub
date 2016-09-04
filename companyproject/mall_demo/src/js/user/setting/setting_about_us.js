new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-tabs": Mui.tabs
    },
    el: "#setting",
    data: {
        el: '#setting',
        tabList: [{
            name: "商场介绍"
        }, {
            name: "关于乐坊"
        }],
        cur: 0,
        showMall: 0,
        showMap: true,
        mallinfo: {}
    },
    methods: {
        init: function() {
            // 初始化商场信息
            Vue.http.get(url + 'index.php?m=Api&c=Mall&a=mallInfo', {
                mall_id: this.userdata.current_mall_id
            }).then(function(res) {
                if (res.data.status == 1) {
                    // 获取信息
                    this.mallinfo = _.mapValues(res.data.data, function(el, key) {
                        if (key == 'cover') {
                            el = url + el
                        }
                        if (key == 'logo_pic') {
                            el = url + el
                        }
                        return el;
                    })
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err);
            })
        },
        tabMap: function() {
            this.showMap ? this.showMap = false : this.showMap = true;
            event.preventDefault();
        },
        changeTab: function(num) {
            this.showMall = num;
        }
    },
    events: {
        "tab": function(index) {
            this.changeTab(index); //执行函数
        }
    },
    ready: function() {
        // util.console.log(this.userdata.current_mall_id)
        var geoinfo = util.geo[_.findIndex(util.geo, function(el) {
            return el.id == this.userdata.current_mall_id;
        }.bind(this))]
        this.$nextTick(function() {
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(geoinfo.longtitude, geoinfo.latitude);
            console.log(BMap.Marker)
            map.centerAndZoom(point, 15);
            var marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            map.enableScrollWheelZoom(true); //允许放大缩小
            setTimeout(function() {
                this.showMap = false;
            }.bind(this))

            // this.$nextTick(function(){
            //     this.showMap = false;
            // })
        }.bind(this))

    }
})
