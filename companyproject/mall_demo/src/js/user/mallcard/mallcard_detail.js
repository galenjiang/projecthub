new Vue({
    mixins: [Mui.vueMixinInit],
	el:'#app',
	data:{
        cardInfo: {}
	},

    methods: {
        init: function(){
            Vue.http.get(url + 'index.php?m=Api&c=User&a=coupon_info',{
                // app_auth_code: this.userdata.app_auth_code,
                id: this.id
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data.data);
                    this.cardInfo = _.mapValues(res.data.data, function(el, key){
                        if(key == 'img'){
                            el = url + el;
                        }
                        if(key == 'valid_begin'){
                            el = new Date(el*1000).Format("yyyy-MM-dd")
                        }
                        if(key == 'valid_end'){
                            el = new Date(el*1000).Format("yyyy-MM-dd")
                        }
                        if(key == 'codeimg'){
                            el = url + el;
                        }
                        return el
                    })
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err);
            })
        }
    },
    created: function(){
        var queryObj = util.urlQuery();
        this.id = queryObj.id;
    }

})
