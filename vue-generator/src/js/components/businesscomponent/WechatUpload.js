module.exports = {
    props: {
        url: {
            type: String,
            default: "./index.php?m=Api&c=Upload&a=Upload"
        },
        index: {
            type: Number
        },
        delete: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            img: '',
            status: false
        }
    },

    computed: {
        styleObj: function() {
            return {
                display: this.img ? 'none' : 'inline-block'
            }
        }
    },

    methods: {
        upload: function() {
            wx.ready(function() {
                wx.chooseImage({
                    count: 1,
                    success: function(res) {
                        wx.uploadImage({
                            localId: res.localIds[0],
                            isShowProgressTips: 1,
                            success: function(res) {
                                // alert(res.serverId)
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                // 图片上传php
                                Vue.http.get(URL + 'index.php?m=Home&c=Demo&a=getImg', {
                                    MediaId: serverId
                                }).then(function(res) {
                                    this.img = res.data;
                                    this.$dispatch('img', {
                                        index: this.index,
                                        img: this.img
                                    })
                                }.bind(this)).catch(function(err) {
                                    alert(err)
                                })
                            }.bind(this)
                        })
                    }.bind(this)
                })
            }.bind(this))
        },
        longtouch: function() {
            this.status ? this.status = false : this.status = true;
            event.preventDefault();
        },
        close: function(e) {
            this.$dispatch('close', this.index);
            this.$destroy(true);
            e.preventDefault();
        }
    },

    template: '<p :index="index" v-touch:tap="upload" v-touch:pressup="longtouch" class="mui-upload-frame">\
    <img class="mui-upload-pic" v-show="true" :src="img"/>\
    <i class="mui-iconfont mui-icon-zhaopian" :style="styleObj"></i>\
    <i v-show="status && delete" v-touch:tap="close" class="mui-iconfont mui-icon-guanbi"></i>\
    </p>'

}
