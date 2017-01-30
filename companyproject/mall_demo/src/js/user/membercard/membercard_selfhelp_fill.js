var app = new Vue({
    mixins: [Mui.vueMixinInit],
    components: {
        "mui-upload-picture": Mui.uploadPicture
    },
    el: "#app",
    data: {
        userdata: {},
        shopList: [],
        sendObj: {
            mall_id: '',
            receipt_id: '', //小票号
            receipt_amount: '', //小票金额
            shop_id: '', //消费店铺
            consume_time: (new Date()).Format("yyyy-MM-dd"),
            receipt_img: [] //小票照片
        },
        imgArr: [],
        imgList: 1
    },
    events: {
        "img": function(msg) {
            util.console.log(this.sendObj.receipt_img)
            var _index = _.findIndex(this.imgArr, function(el) {
                return el.index == msg.index;
            })
            util.console.log(_index)
            if (_index != -1) {
                var newArr = _.slice(this.imgArr);
                newArr[_index] = msg;
            } else {
                this.imgArr = _.concat(this.imgArr, msg)
            }
            this.sendObj.receipt_img = _.map(this.imgArr, function(el) {
                return el.img
            })
        },
        "close": function(index) {
            var newArr = _.slice(this.imgArr);
            this.imgArr = _.filter(newArr, function(el) {
                return el.index != index
            })
            this.sendObj.receipt_img = _.map(this.imgArr, function(el) {
                return el.img
            })
        }
    },
    methods: {
        init: function() {
            // 初始化
            this.sendObj.mall_id = this.userdata.current_mall_id;
            // 初始化shoplist
            this.getShopList();

        },
        add: function() {
            this.imgList += 1;
            event.preventDefault();
        },
        getShopList: function(){
            Vue.http.get(url + 'index.php?m=Api&c=Shop&a=shop_all_list',{
                mall_id: this.userdata.current_mall_id
            }).then(function(res){
                if(res.data.status == 1){
                    this.shopList = _.map(res.data.data,function(el){
                        return el;
                    })
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err)
            })
        },
        sendTicketInfo: function() {
            if (!/.+/.test(this.sendObj.receipt_id)) {
                Mui.message.toast({
                    msg: "请填写小票号码！"
                })
            } else if (!/.+/.test(this.sendObj.receipt_amount)) {
                Mui.message.toast({
                    msg: "请填写小票金额！"
                })
            } else if (!/.+/.test(this.sendObj.shop_id)) {
                Mui.message.toast({
                    msg: "请填写消费店铺！"
                })
            }  else if (!/.+/.test(this.sendObj.consume_time)) {
                Mui.message.toast({
                    msg: "请输入消费时间！"
                })
            } else if (!/.+/.test(this.sendObj.receipt_img)) {
                Mui.message.toast({
                    msg: "请上传小票照片！"
                })
            } else {
                Vue.http.options.emulateJSON = true;
                Vue.http.post(url + 'index.php?m=Api&c=UserCard&a=inputReceipt', this.sendObj)
                    .then(function(res) {
                        if (res.data.status == 1) {
                            Mui.message.alert({
                                msg: "录入成功,请等候审核！"
                            }, function() {
                                window.location.href = url + 'index.php?m=Home&c=User&a=membercard_selfhelp';
                            })
                        } else {
                            Mui.message.toast({
                                msg: res.data.info
                            })
                        }
                    }.bind(this)).catch(function(res) {
                        alert(err)
                    })
            }
        }
    }
})
