var page = new Vue({
    el: "#page",
    data: {
        userdata: {
            header_url: ""
        },
        infoShow: true,
        inputShow: false,
        type: 0,
        changedNickname: '',
        changedSex: '',
        changedBirthday: '',
        changedHeader_url: '',
        pageTransitonType: "mui-tabview-l2r",
        slideTransitionType: "mui-tabview-l2r",
        fastClick: true
    },
    computed: {
        maleClassObj: function() {
            return {
                'mui-icon-xuanzhong': this.changedSex == 1,
                'mui-icon-weixuan': this.changedSex != 1
            }
        },
        femaleClassObj: function() {
            return {
                'mui-icon-xuanzhong': this.changedSex == 2,
                'mui-icon-weixuan': this.changedSex != 2
            }
        },
        sex: function() {
            var sex = ''
            switch (this.userdata.sex) {
                case '1':
                    sex = '男';
                    break;
                case '2':
                    sex = '女';
                    break;
                default:
                    sex = '未知';
                    break;
            }
            return sex;
        },
        nicknameObj: function() {
            return {
                display: this.type == '昵称' ? 'block' : 'none'
            }
        },
        sexObj: function() {
            return {
                display: this.type == '性别' ? 'block' : 'none'
            }
        },
        birthdayObj: function() {
            return {
                display: this.type == "出生年月" ? 'block' : 'none'
            }
        }
    },
    methods: {
        init: function(fn) {
            //initData.
            Vue.http.get(url + 'index.php?m=Api&c=User&a=UserInfo', {
                // app_auth_code: this.userdata.app_auth_code
            }).then(function(res) {
                if (res.data.status == 1) {
                    this.userdata = _.assign({}, this.userdata, _.mapValues(res.data.data, function(el) {
                        return el
                    }));
                    fn && fn();
                    localStorage.userdata = JSON.stringify(this.userdata);
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err) {
                alert(err)
            })
        },

        uploadHead: function() {
            wx.ready(function() {
                wx.chooseImage({
                    count: 1,
                    success: function(res) {
                        util.console.log(res.localIds);
                        wx.uploadImage({
                            localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function(res) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                // 图片上传php服务器
                                Vue.http.get(url + 'index.php?m=Home&c=Demo&a=getImg', {
                                    MediaId: serverId
                                }).then(function(res) {
                                    this.headimg = res.data;
                                    return Vue.http.get(url + 'index.php?m=Api&c=User&a=modifyUserInfo', {
                                        // app_auth_code: this.userdata.app_auth_code,
                                        header_url: res.data,
                                        key: 'header_url'
                                    });
                                }.bind(this)).then(function(res) {

                                    if (res.data.status == 1) {
                                        this.userdata.header_url = this.headimg;
                                        this.updateUserInfo();
                                    } else {
                                        Mui.message.toast({
                                            msg: res.data.info
                                        })
                                    }
                                }.bind(this)).catch(function(err) {
                                    alert(4 + JSON.stringify(err))
                                })

                            }.bind(this)
                        });
                    }.bind(this)
                });
            }.bind(this))

        },

        change: function(type) {
            util.console.log(type);
            this.type = type;
            this.infoShow = false;
            this.inputShow = true;
            this.pageTransitonType = "mui-tabview-r2l";
            this.slideTransitionType = "mui-tabview-r2l";
        },
        inputBack: function() {
            this.infoShow = true;
            this.inputShow = false;
            this.pageTransitonType = "mui-tabview-l2r";
            this.slideTransitionType = "mui-tabview-l2r";
            event.preventDefault();
        },
        save: function() {
            var data = {
                // app_auth_code: this.userdata.app_auth_code,
                nickname: this.changedNickname,
                sex: this.changedSex,
                birthday: this.changedBirthday
            }
            var type = '';
            switch (this.type) {
                case "昵称":
                    type = "nickname";
                    break;
                case "性别":
                    type = "sex";
                    break;
                case "出生年月":
                    type = "birthday";
                    break;
                default:
                    return false;
            }
            data.key = type;
            if (this.fastClick) {
                this.fastClick = false;
                Vue.http.get(url + 'index.php?m=Api&c=User&a=modifyUserInfo', data)
                    .then(function(res) {
                        this.fastClick = true
                        if (res.data.status == 1) {
                            this.init();
                            this.inputBack();
                        } else {
                            Mui.message.toast({
                                msg: res.data.info
                            })
                        }
                    }.bind(this)).catch(function(err) {
                        this.fastClick = true
                        alert(err);
                    }.bind(this))
            }
        },
        change2male: function() {
            this.changedSex = 1;
        },
        change2female: function() {
            this.changedSex = 2;
        }
    },
    created: function() {
        this.init(function() {
            this.changedNickname = this.userdata.nickname;
            this.changedBirthday = this.userdata.birthday;
            switch (this.sex) {
                case '男':
                    this.changedSex = 1;
                    break;
                case '女':
                    this.changedSex = 2;
                    break;
                default:
                    this.changedSex = 1;
            }
        }.bind(this));
    },
    beforeCompile: function() {
        this.userdata = util.init();
        util.geograph(function() {
            this.userdata = util.init();
            this.init(function() {
                this.changedNickname = this.userdata.nickname;
                this.changedBirthday = this.userdata.birthday;
                switch (this.sex) {
                    case '男':
                        this.changedSex = 1;
                        break;
                    case '女':
                        this.changedSex = 2;
                        break;
                    default:
                        this.changedSex = 1;
                }
            }.bind(this));
        }.bind(this))

    },
    ready: function() {
        // var self = this;
        // // 监控input
        // this.$els.headinput.onchange = function() {
        //     util.console.log(this.files[0])
        //     var formdata = new FormData();
        //     formdata.append('file', this.files[0]);
        //     // 上传图片
        //     var xhr = new XMLHttpRequest();
        //     xhr.responseType = 'json';
        //     xhr.open('POST', url + 'index.php?m=Api&c=Upload&a=Upload', true);
        //     xhr.onreadystatechange = function() {
        //         util.console.log(xhr.readyState)
        //         if (xhr.readyState == 4 && xhr.status == 200) {
        //             if (xhr.response.status == 1) {
        //                 var img = xhr.response.data[0].imgUrl.match(/\/Upload.+$/)[0];
        //                 util.console.log(img);
        //                 // 再次请求修改地址
        //                 Vue.http.get(url + 'index.php?m=Api&c=User&a=modifyUserInfo', {
        //                     app_auth_code: self.app_auth_code,
        //                     header_url: img,
        //                     key: 'header_url'
        //                 }).then(function(res) {
        //                     if (res.data.status == 1) {
        //                         self.userdata.header_url = url + img;
        //                     } else {
        //                         Mui.message.toast({
        //                             msg: res.data.info
        //                         })
        //                     }
        //                 }).catch(function(err) {
        //                     alert(err)
        //                 })
        //             } else {
        //                 Mui.message.toast({
        //                     msg: xhr.response.info
        //                 })
        //             }
        //
        //         }
        //     }
        //     xhr.send(formdata);
        // }
    }
})
