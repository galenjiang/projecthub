
new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-upload-picture": Mui.uploadPicture
    },
    el: "#orderComment",
    data: {
        id: -1,
        star: 0,
        comment: '',
        img: []
    },
    methods: {
        init: function(){
            // 初始化
        },
        editStar: function(index){
            this.star = index + 1;
        },
        postComment: function(){
            if(this.star < 1){
                Mui.message.toast({
                    msg: '请对礼品进行评分'
                })
                return false;
            }else if(!/.+/.test(this.comment)){
                Mui.message.toast({
                    msg: '请对礼品进行评价'
                })
                return false;
            }else{
                Vue.http.get(url + 'index.php?m=Api&c=IntegralGift&a=comment_gift',{
                    // app_auth_code: this.userdata.app_auth_code,
                    mall_id: this.userdata.current_mall_id,
                    commodity_id: this.id,
                    star: this.star,
                    comment: this.comment,
                    img: this.img
                }).then(function(res){
                    if(res.data.status == 1){
                        Mui.message.alert({
                            msg: '评论成功'
                        },function(){
                            window.location.href = url + 'index.php?m=Home&c=User&a=order_list'
                        })
                    }else{
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }).catch(function(err){
                    alert(err)
                })
            }
        }
    },
    events: {
        "img": function(msg){
            console.log(msg);
            this.img[0] = msg.img;
        }
    },
    created: function(){
        var queryObj = util.urlQuery();
        this.id = queryObj.id;
    }
})
