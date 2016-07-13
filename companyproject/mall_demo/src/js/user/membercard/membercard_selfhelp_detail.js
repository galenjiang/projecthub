var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#app",
    data: {
        userdata: {},
        status: '',
        id: 0,
        list: {}
    },
    computed: {
        title: function() {
            var title = '';
            switch (this.status) {
                case '0':
                    title = "待审核小票";
                    break;
                case '1':
                    title = "已通过小票";
                    break;
                case '2':
                    title = "未通过小票";
                    break;
                default:
                    title = "";
            }
            return title
        }
    },
    methods: {
        init: function(){
            // 获取小票信息
            Vue.http.get(url + 'index.php?m=Api&c=UserCard&a=receiptInfo',{
                // app_auth_code: this.userdata.app_auth_code,
                id: this.id
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data.data);
                    var extendObj = {};
                    var obj = _.mapValues(res.data.data,function(el,key){
                        if(key == 'mall_id'){
                            extendObj.mall = util.geo[_.findIndex(util.geo, function(el){
                                return el.id == res.data.data["mall_id"]
                            })].name
                        }
                        return el;
                    })
                    console.log(extendObj,obj)
                    this.list = _.assign({},extendObj,obj);

                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        }
    },
    created:function(){
        var urlObj = util.urlQuery();
        this.status = urlObj.status;
        this.id = urlObj.id;
    }
})
