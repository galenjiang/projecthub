new Vue({
    mixins: [Mui.vueMixinInit],

    el: "#wifi",

    data: {
        userdata: {},
        bannerList: []
    },

    methods: {
        init: function(){
            // 初始化
        },
        getBannerList: function(){
            // 获取banner
            Vue.http.get(url + 'index.php?m=Api&c=Banner&a=adver',{
                place: 4,
                mall_id: this.userdata.current_mall_id
            }).then(function(res){
                if(res.data.status == 1){
                    this.bannerList = _.map(res.data.data,function(el){
                        el.img = '.' + el.img;
                        return el
                    })
                    // swipe
                    this.$nextTick(function() {
                        Swipe(document.getElementById('slider'), {
                            auto: 3000,
                            continuous: true
                        });
                    })
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        }
    }
})
