new Vue({
    mixins: [Mui.vueMixinInit],
    el: '#setting_suggest',
    components: {
        "mui-upload-picture": Mui.uploadPicture
    },
    data: {
        userdata: {},
        sendObj: {
            mall_id: '',
            // app_auth_code: '',
            title: '',
            content: '',
            img: []
        },
        imgArr: [],
        imgList: 1
    },
    events: {
        "img": function(msg) {
            util.console.log(msg.index)
            var _index = _.findIndex(this.imgArr, function(el) {
                return el.index == msg.index;
            })
            if (_index != -1) {
                var newArr = _.slice(this.imgArr);
                newArr[_index] = msg;
            } else {
                this.imgArr = _.concat(this.imgArr, msg)
            }
            this.sendObj.img = _.map(this.imgArr, function(el) {
                return el.img
            })
        },
        "close": function(index){
            this.imgArr = _.filter(this.imgArr, function(el) {
                return el.index != index
            })
            this.sendObj.img = _.map(this.imgArr, function(el) {
                return el.img
            })
        }
    },
    methods: {
        init: function(){
            //
            this.sendObj.mall_id = this.userdata.current_mall_id;
            // this.sendObj.app_auth_code = this.userdata.app_auth_code;
        },
        add: function() { //增加图片
            this.imgList += 1;
            event.preventDefault();
        },
        sendSuggest: function() { //提交意见
            if (!/.+/.test(this.sendObj.title)) {
                Mui.message.toast({
                    msg: "请填写标题"
                })
            } else if (!/.+/.test(this.sendObj.content)) {
                Mui.message.toast({
                    msg: "请填写反馈意见"
                })
            } else {
                util.console.log(this.sendObj)
                Vue.http.get(url + 'index.php?m=Api&c=Mall&a=addfeedback', this.sendObj).then(function(res) { //发送请求 next
                    if (res.data.status == 1) {
                        util.console.log(res)
                        window.location.href = url + "index.php?m=Home&c=User&a=setting_suggest_success"
                    }else{
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err) {
                    alert(err)
                })
            }
        }
    }
})
