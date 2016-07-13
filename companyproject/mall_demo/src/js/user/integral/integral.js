var app = new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-circle-progress": Mui.circleProgress
    },
    el: "#integral",
    data: {
        userdata: {},
        carddata: {},
        cirecleProgressData: {
            progress: 0,
            textUpper: 0,
            textLower: "当前积分"
        }
    },
    methods: {
        init: function() {
            Vue.http.post(url + 'index.php?m=Api&c=User&a=card_user', {
                // app_auth_code: this.userdata.app_auth_code
            }).then(function(res) {
                if (res.data.status == 1) {
                    this.carddata = res.data.data;
                    var textUpper = Number(res.data.data.integral);
                    var inter = Math.floor(textUpper / 36);
                    var num = 0;
                    var timer = setInterval(function() {
                        num = num + inter;
                        // 转圈
                        this.cirecleProgressData.progress += 10;
                        // 数字
                        this.cirecleProgressData.textUpper = num;
                        if (this.cirecleProgressData.progress > 360) {
                            this.cirecleProgressData.textUpper = textUpper;
                            clearInterval(timer);
                        }
                    }.bind(this), 30)
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })

            this.updateUserInfo();
        }
    }
})
