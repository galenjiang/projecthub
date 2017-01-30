new Vue({
    mixins: [Mui.vueMixinInit],

    el: '#app',

    data: {
        title: '',
        pubTime: '',
        img: null,
        about: '',
        id: ''
    },

    methods: {
        init: function() {
            Vue.http.get(url + 'index.php?m=Api&c=mall&a=mall_xiaoxi_id', {
                id: this.id
            }).then(function(res) {
                if(res.data.status == 1){
                    var getData = res.data.data[0];
                    this.title = getData.title;
                    this.pubTime = new Date(getData.pub_time * 1000).Format("yyyy-MM-dd")
                    this.img = url + getData.img;
                    this.about = getData.note
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        }
    },

    created: function(){
        var getId = util.urlQuery(); //获取页面id
        this.id = getId.id
    }
})
