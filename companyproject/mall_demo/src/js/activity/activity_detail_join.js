new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#app",
    data: {
        userdata: {},
        activeinfo: {},
        shareMaskStatus: false,
        statusJoin: false
    },
    methods: {
        init: function() {
            this.getInfo().then(function(){
                util.console.log(this.activeinfo);
                this.shareInit();
            }.bind(this)).catch(function(err){
                alert(err)
            })
        },
        getInfo: function(){
            // 获取预约信息
             return Vue.http.get(url + 'index.php?m=Api&c=Active&a=booking_active', {
                // app_auth_code: this.userdata.app_auth_code,
                mall_id: this.userdata.current_mall_id,
                id: this.id
            }).then(function(res) { //success
                util.console.log(res.data)
                if(res.data.status == 1){
                    this.activeinfo = _.assign({},_.mapValues(res.data.data,function(el,key){
                        if(key == 'img'){
                            el = url + el;
                        }
                        if(key == 'iscoupon' && el >= 1){
                            this.statusJoin = true;
                        }
                        // if(key == 'isMaxUser'){
                        //
                        // }
                        return el//
                    }.bind(this)),{
                        url: url + 'index.php?m=Home&c=Activity&a=activity_detail_join_fill&id=' + this.id
                    })
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this))
        },
        share: function(){
            this.shareMaskStatus ? this.shareMaskStatus = false : this.shareMaskStatus = true;
        },
        shareInit: function() {
            var params = {
                title: '乐坊商场', // 分享标题
                desc: this.activeinfo.active_name,
                link: window.location.href + '&mall=' + this.mall || this.userdata.current_mall_id, // 分享链接
                imgUrl: this.activeinfo.img, // 分享图标
                success: function() {
                    Mui.message.toast({
                        msg: "分享成功"
                    })
                },
                cancel: function() {
                    Mui.message.toast({
                        msg: "系统错误"
                    })
                }
            }
            wx.onMenuShareAppMessage(params);
            wx.onMenuShareTimeline(params);
        }
    },
    created: function(){
        //获取页面id
        this.id = util.urlQuery().id;
    }
})
