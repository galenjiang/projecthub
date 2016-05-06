var app = new Vue({
    mixins: [Mui.vueMixinInit],
    el: "#registerPage",
    data: {
        userdata: {},
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
        client: 2
    },
    methods: {
        init: function() {
            //
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
                    Vue.http.get(url + 'index.php?m=Api&c=User&a=Register', {
                        phone: this.phone,
                        passwd: this.passwd,
                        auth_code: this.verify,
                        confirm_pwd: this.repeatpasswd,
                        register_client: this.client,
                        mall_id: this.userdata.current_mall_id || 1
                    }).then(function(res) {
                        this.fastClick = true;
                        if (res.data.status == 1) {
                            localStorage.userdata = JSON.stringify(_.assign({}, this.userdata, res.data.data))
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
        },
        getVerify: function() {
            // 发送验证码
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
                    }).then(function(res) {
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
            // 第一步提交
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
                    }).then(function(res) {
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
