new Vue({
    mixins: [Mui.vueMixinInit],

    el: "#loginPage",

    data: {
        fastClick: true,
        userdata: {},
        phone: "",
        password: ""
    },

    methods: {
        init: function(){
            // 初始化
        },
        login: function() {
            event.stopPropagation();
            if (!Mui.regular.phone(this.phone)) {
                Mui.message.toast({
                    msg: "手机号码错误"
                })
            } else if (!/.+/.test(this.password)) {
                Mui.message.toast({
                    msg: "密码错误"
                })
            } else {
                if (this.fastClick) {
                    this.fastClick = false;
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=Login', {
                            phone: this.phone,
                            passwd: this.password
                        }).then(function(res) {
                            this.fastClick = true;
                            if (res.data.status == 1) {
                                res.data.data.current_mall_id = this.userdata.current_mall_id || 1;
                                localStorage.userdata = JSON.stringify(_.assign({},this.userdata,res.data.data));
                                window.location.href = url + "index.php";
                            } else {
                                Mui.message.toast({
                                    msg: res.data.info
                                })
                            }
                        }.bind(this)).catch(function(err) {
                            this.fastClick = true;
                            alert(err)
                        }.bind(this));
                }
            }
        }
    }
})
