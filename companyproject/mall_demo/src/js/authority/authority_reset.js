var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#resetPage",
    data: {
        userID: '',
        showStep: true,
        stepFirstTransitionType: "mui-tabview-l2r",
        stepSecondTransitionType: "mui-tabview-l2r",
        phone: "",
        passwd: "",
        verify: "",
        repeatpasswd: "",
        fastClick: true,
        canSendVeri: true,
        verifyContent: "获取验证码",
        client: 2,
        mall: 1
    },
    methods: {
        init: function() {
            // 初始化
        },
        nextStep: function() {
            this.showStep = false;
            this.stepFirstTransitionType = "mui-tabview-r2l";
            this.stepSecondTransitionType = "mui-tabview-r2l";
        },
        preStep: function() {
            this.showStep = true;
            this.stepFirstTransitionType = "mui-tabview-l2r";
            this.stepSecondTransitionType = "mui-tabview-l2r";
        },
        reg: function() {
            if (!Mui.regular.phone(this.phone)) {
                Mui.message.toast({
                    msg: "手机号码错误"
                })
            } else if (!/.+/.test(this.verify)) {
                Mui.message.toast({
                    msg: "验证码错误"
                })
            } else if (this.repeatpasswd != this.passwd) {
                Mui.message.toast({
                    msg: "密码不一致"
                })
            } else if (!/.+/.test(this.passwd)) {
                Mui.message.toast({
                    msg: "密码错误"
                })
            } else {
                if (this.fastClick) {
                    this.fastClick = false;
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=changepasswd', {
                        app_auth_code: this.userID,
                        phone: this.phone,
                        passwd: this.passwd,
                        confirm_pwd: this.repeatpasswd,
                        auth_code: this.verify
                    }).then(function(res) {
                        this.fastClick = true;
                        if (res.data.status == 1) {
                            window.location.href = url + 'index.php?m=Home&c=Authority&a=authority_login';
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
        },
        getVerify: function() {
            if (!Mui.regular.phone(this.phone)) {
                Mui.message.toast({
                    msg: "手机号码错误"
                })
            } else {
                if (this.fastClick && this.canSendVeri) {
                    this.canSendVeri = false;
                    this.fastClick = false;
                    var time = 60;
                    var timer = setInterval(function() {
                        this.verifyContent = time + '秒后再次获取';
                        time--;
                        if (time == 0) {
                            clearInterval(timer);
                            this.canSendVeri = true;
                            this.verifyContent = "获取验证码"
                        }
                    }.bind(this), 1000)
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=authcode', {
                            phone: this.phone
                        })
                        .then(function(res) {
                            this.fastClick = true;
                            if (res.data.status == 1) {
                                Mui.message.toast({
                                    msg: "发送成功！"
                                })
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
        },
        firstStepVerify: function() {
            if (!Mui.regular.phone(this.phone)) {
                Mui.message.toast({
                    msg: "手机号码错误"
                })
            } else if (!/.+/.test(this.verify)) {
                Mui.message.toast({
                    msg: "验证码错误"
                })
            } else {
                if (this.fastClick) {
                    this.fastClick = false;
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=checkcode', {
                            phone: this.phone,
                            auth_code: this.verify
                        })
                        .then(function(res) {
                            this.fastClick = true;
                            if (res.data.status == 1) {
                                this.nextStep();
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
