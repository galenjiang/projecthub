// asyncData
Vue.use(VueAsyncData);
// 未完成
// options: props: [""]

(function() {
    Vue.directive("unfinished", {
        params: [],
        bind: function() {
            var hammertime = new Hammer(this.el);
            hammertime.on('tap', function(ev) {
                Mui.message.toast({
                    msg: "敬请期待"
                })
                console.log(ev)
                ev.preventDefault();
            });
            this.el.addEventListener('touchend', function(e) {
                e.preventDefault();
            }, false)
        },
        update: function() {},
        unbind: function() {}
    })
})();

// / banner模块
// props: ["bannerList"]
(function() {
    // 图片页
    var page = Vue.extend({
        props: {
            link: {
                type: String,
                default: '#'
            },
            img: {
                type: String,
                default: '#'
            },
            index: {
                type: Number
            }
        },
        computed: {
            classObject: function() {
                return {
                    cur: (this.index == 0 ? true : false)
                }
            }
        },
        template: '<a\
      :href="link"\
      :class="classObject"\
      class="mui-banner-page">\
        <img :src="img">\
      </a>',
        beforeCompile: function() {}
    })

    // 指示器
    var dot = Vue.extend({
        props: ['now', 'index'],
        computed: {
            classObject: function() {
                return {
                    "mui-banner-indicator-dot-active": this.now == this.index,
                    "mui-banner-indicator-dot": true
                }
            }
        },
        template: '<span v-bind:class="classObject"></span>',
        ready: function() {}
    });

    // 主模块
    Mui.banner = Vue.extend({
        props: {
            bannerList: {
                type: Array,
                default: []
            }
        },
        data: function() {
            return {
                timer: null,
                now: 0
            }
        },
        components: {
            "mui-banner-indicator-dot": dot,
            "mui-banner-page": page
        },
        computed: {
            bannerModel: function() {

            },
            newBannerList: function() {

            }
        },
        watch: {
            "now": function(newVal, oldVal) {
                newVal > oldVal ? this.slide('left', newVal, oldVal) : this.slide('right', newVal, oldVal)
            }
        },
        methods: {
            slide: function(direction, selected, prev) {
                if (direction == "left") {
                    var slider = document.querySelectorAll('.mui-banner-page');
                    slider[selected].classList.add('next');
                    // trigger layout
                    var x = slider[selected].clientHeight;
                    var addCurEvent = function() {
                        this.classList.remove('next', 'trans');
                        this.removeEventListener('transitionend', addCurEvent, false)
                    }.bind(slider[selected])
                    slider[selected].addEventListener('transitionend', addCurEvent, false)
                    slider[selected].classList.add('trans', 'cur');

                    var addPrevEvent = function() {
                        this.classList.remove('prev', 'trans', 'cur');
                        this.removeEventListener('transitionend', addPrevEvent, false)
                    }.bind(slider[prev])
                    slider[prev].addEventListener('transitionend', addPrevEvent, false)
                    slider[prev].classList.add('trans');
                    slider[prev].classList.add('prev');
                    slider[prev].classList.remove('cur');

                } else {
                    var slider = document.querySelectorAll('.mui-banner-page');
                    slider[selected].classList.add('prev');
                    // trigger layout
                    var x = slider[selected].clientHeight;
                    var addCurEvent = function() {
                        this.classList.remove('prev', 'trans');
                        this.removeEventListener('transitionend', addCurEvent, false)
                    }.bind(slider[selected])
                    slider[selected].addEventListener('transitionend', addCurEvent, false)
                    slider[selected].classList.add('trans', 'cur');

                    var addPrevEvent = function() {
                        this.classList.remove('next', 'trans', 'cur');
                        this.removeEventListener('transitionend', addPrevEvent, false)
                    }.bind(slider[prev])
                    slider[prev].addEventListener('transitionend', addPrevEvent, false)
                    slider[prev].classList.add('trans');
                    slider[prev].classList.add('next');
                    slider[prev].classList.remove('cur');
                }
            },
            next: function() {
                this.now + 1 < this.bannerList.length ? this.now += 1 : this.now = 0;
            },
            previous: function() {
                this.now - 1 >= 0 ? this.now -= 1 : this.now = this.bannerList.length - 1;
            }
        },
        template: '<div class="mui-banner" v-touch:swipeleft="next" v-touch:swiperight="previous">\
        <div class="mui-banner-pages">\
          <mui-banner-page v-for="item in bannerList" track-by="$index"\
            :link="item.link"\
            :img="item.img"\
            :index="$index"\
          ></mui-banner-page>\
        </div>\
        <div class="mui-banner-indicator">\
            <mui-banner-indicator-dot v-for="item in bannerList"\
            :index="$index"\
            :now="now"></mui-banner-indicator-dot>\
        </div>\
    </div>',
        ready: function() {}
    })
})();


// tabs-default模块
// props: ["tablist"]
(function() {
    var tab = Vue.extend({
        props: ["index", "name", "now"],
        computed: {
            classObject: function() {
                return {
                    "mui-tab-cell": true,
                    "mui-tab-active": this.now == this.index
                }
            }
        },
        methods: {
            sendindex: function() {
                this.$dispatch("tab", this.index);
            }
        },
        template: '<li v-touch:tap="sendindex" :class="classObject">{{name}}</li>'
    })

    Mui.tabs = Vue.extend({
        props: ["tabList", "cur"],
        data: function() {
            return {
                now: 0
            }
        },
        // methods: {},
        components: {
            "mui-tab": tab
        },
        computed: {
            styleObject: function() {
                return {
                    "transform": "translateX(" + this.now * 100 + "%) translateZ(0)",
                    "width": 1 / this.tabList.length * 100 + "%"
                }
            }
        },
        events: {
            "tab": function(index) {
                this.now = index;
                return true;
            }
        },
        watch: {},
        template: '<div v-el:line class="mui-tabs mui-line-bottom">\
        <ul class="mui-tab">\
          <mui-tab v-for="item in tabList" \
            :name="item.name"\
            :index="$index"\
            :now="now"\
            ></mui-tab>\
        </ul>\
        <div class="mui-tab-line" :style="styleObject"></div>\
      </div>',
        ready: function() {
            this.now = this.cur;
        }
    })


})();

// tabs-implict 模块
// props: ["tablists", "cur"]
(function() {
    var tab = Vue.extend({
        props: {
            name: {
                type: String,
                default: ''
            },
            index: {
                type: Number,
                default: 0
            },
            cur: {
                type: Number,
                default: 0
            }
        },
        methods: {
            tab: function() {
                this.cur = this.index;
            }
        },
        computed: {
            classObject: function() {
                return {
                    "active": this.cur == this.index
                }
            }
        },
        template: '<span v-touch:tap="tab" class="mui-tab" :class="classObject">{{name}}</span>'
    })

    Mui.tabsImplict = Vue.extend({
        props: {
            tabList: {
                type: Array,
                default: []
            },
            cur: {
                type: Number,
                default: 0
            }
        },
        data: function() {
            return {
                now: 0
            }
        },
        components: {
            "mui-tab": tab
        },
        events: {
            "tab": function(index) {
                // this.now = index;
                // return true;
            }
        },
        template: '<div class="mui-tabs--implict">\
      <mui-tab\
        v-for="tab in tabList"\
        :name="tab.name"\
        :index="$index"\
        :cur.sync="cur"\
      ></mui-tab>\
    </div>',
        ready: function() {}
    })
})();



// 下拉刷新directive
// options: props: [""]
(function() {
    Vue.directive("refresh", {
        params: [
            "callback",
            "allowrefresh"
        ],
        bind: function() {
            this.el.addEventListener("scroll", function() {
                if (this.el.scrollTop + this.el.clientHeight + 10 > this.el.scrollHeight) {
                    if (this.params.allowrefresh) {
                        this.params.callback();
                    }
                }
            }.bind(this), false)
        },
        update: function() {},
        unbind: function() {

        }
    })
})();

// showpiture 组件

// options: props: ["url", "img", "textUpper", "textLower"]
(function() {

    Mui.showPiture = Vue.extend({

        props: {
            url: {
                type: String,
                default: "#"
            },
            img: {
                type: String,
                default: "#"
            },
            textUpper: {
                type: String,
                default: "主标题"
            },
            textLower: {
                type: String,
                default: "副标题"
            }
        },

        template: '<a :href="url" class="mui-show-picture">\
      <img :src="img" />\
      <div class="item-title  mui-padding-0-10">\
        <h4>{{ textUpper }}</h6>\
        <p>{{ textLower }}</p>\
        <slot></slot>\
      </div>\
    </a>'
    })
})();

// circle-progress 组件
// options: props: ["progress", "textUpper", "textLower"]
(function() {
    Mui.circleProgress = Vue.extend({
        props: {
            progress: {
                type: Number,
                default: 0
            },
            textUpper: {
                type: Number,
                default: 666
            },
            textLower: {
                type: String,
                default: "副标题"
            }
        },
        data: function() {
            return {
                num: 0
            }
        },
        computed: {
            rightProgress: function() {
                if (this.progress > 180) {
                    return {
                        transform: "rotate(45deg)"
                    }
                } else {
                    return {
                        transform: "rotate(" + (-135 + this.progress) + "deg)"
                    }
                }
            },
            leftProgress: function() {
                if (this.progress < 180) {
                    return {
                        transform: "rotate(-315deg)"
                    }
                } else if (this.progress > 360) {
                    return {
                        transform: "rotate(" + (-315 + 180) + "deg)"
                    }
                } else {
                    return {
                        transform: "rotate(" + (-315 + this.progress - 180) + "deg)"
                    }
                }
            }
        },
        template: '<div class="mui-circle-progress">\
      <div class="circle-wrapper right">\
        <div class="circleProgress rightcircle"  :style="rightProgress"></div>\
      </div>\
      <div class="circle-wrapper left">\
        <div class="circleProgress leftcircle" :style="leftProgress"></div>\
      </div>\
      <div class="circle-text">\
        <h4 class="title-upper">{{ textUpper }}</h4>\
        <p class="title-lower">{{ textLower }}</p>\
      </div>\
    </div>',
        ready: function() {

        }
    })
})();

//
// // order-list 组件
// // options: props: ["type", "orderNumber",
// // "name", "score", "quantity", "queryCode"]
// (function() {
//     Mui.orderList = Vue.extend({
//         props: {
//             type: {
//                 type: String,
//                 default: "待收货"
//             },
//             orderNumber: {
//                 type: String,
//                 default: ""
//             },
//             name: {
//                 type: String,
//                 default: "商品名"
//             },
//             img: {
//                 // type: String,
//                 // default: "#"
//             },
//             score: {
//                 // type: String,
//                 // default: ""
//             },
//             quantity: {
//                 type: String,
//                 default: ""
//             },
//             queryCode: {
//                 type: String,
//                 default: ""
//             },
//             commentUrl: {
//                 type: String,
//                 default: "#"
//             }
//         },
//         computed: {
//             status: function() {
//                 switch (this.type) {
//                     case "待领取":
//                         return 0;
//                     case "已完成":
//                         return 1;
//                     case "已取消":
//                         return 2;
//                     default:
//                         return 1;
//                 }
//             }
//         },
//         methods: {
//             cancel: function(){
//                 Vue.http.get('./index.php?m=Api&c=UserOrder&a=resetOrder',{
//
//                 }).then(function(){})
//             }
//         },
//         template: ""
//     })
// })();


// upload-picture-wx 组件
// options: props: ["

(function() {
    Mui.uploadPicture = Vue.extend({
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
            upload: function(){
                wx.ready(function(){
                    wx.chooseImage({
                        count: 1,
                        success: function(res){
                            wx.uploadImage({
                                localId: res.localIds[0],
                                isShowProgressTips: 1,
                                success: function(res){
                                    // alert(res.serverId)
                                    var serverId = res.serverId; // 返回图片的服务器端ID
                                    // 图片上传php
                                    Vue.http.get(url + 'index.php?m=Home&c=Demo&a=getImg', {
                                        MediaId: serverId
                                    }).then(function(res){
                                        this.img = res.data;
                                        this.$dispatch('img', {
                                            index: this.index,
                                            img: this.img
                                        })
                                    }.bind(this)).catch(function(err){alert(err)})
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

    })

})();

// upload-picture 组件 discarded
// options: props: [""]

// (function() {
//     Mui.uploadPicture = Vue.extend({
//         props: {
//             url: {
//                 type: String,
//                 default: "./index.php?m=Api&c=Upload&a=Upload"
//             },
//             index: {
//                 type: Number
//             },
//             delete: {
//                 type: Boolean,
//                 default: true
//             }
//         },
//
//         data: function() {
//             return {
//                 img: '',
//                 status: false
//             }
//         },
//
//         computed: {
//             styleObj: function() {
//                 return {
//                     display: this.img ? 'none' : 'inline-block'
//                 }
//             }
//         },
//
//         methods: {
//             longtouch: function() {
//                 this.status ? this.status = false : this.status = true;
//                 event.preventDefault();
//             },
//             close: function(e) {
//                 this.$dispatch('close', this.index);
//                 this.$destroy(true);
//                 e.preventDefault();
//             }
//         },
//
//         template: '<p :index="index" v-touch:pressup="longtouch" class="mui-upload-frame">\
//     <img class="mui-upload-pic" v-show="true" :src="img"/>\
//     <i class="mui-iconfont mui-icon-zhaopian" :style="styleObj"></i>\
//     <input class="mui-upload-input" type="file" />\
//     <i v-show="status && delete" v-touch:tap="close" class="mui-iconfont mui-icon-guanbi"></i>\
//     </p>',
//
//         ready: function() {
//             this.$el.querySelector('input[type=file]').onchange = function() {
//                 var formdata = new FormData();
//                 formdata.append("file", this.$el.querySelector('input[type=file]').files[0])
//                 var xhr = new XMLHttpRequest();
//                 xhr.responseType = 'json';
//                 xhr.open("POST", this.url, true);
//                 xhr.onreadystatechange = function() {
//                     if (xhr.readyState == 4 && xhr.status == 200) {
//                         if (xhr.response.status == 1) {
//                             this.img = xhr.response.data[0].imgUrl;
//                             this.$dispatch('img', {
//                                 index: this.index,
//                                 img: this.img
//                             })
//                         } else {
//                             // Mui.message.alert({
//                             //     msg: xhr.response.info
//                             // })
//                         }
//                     }
//                 }.bind(this)
//                 xhr.send(formdata);
//
//             }.bind(this)
//         }
//     })
//
// })();

(function() {
    Mui.coupon = Vue.extend({
        props: {
            img: {
                type: String,
                default: "#"
            },
            status: {
                type: Number,
                default: 0
            },
            uri: {
                type: String,
                default: 0
            }
        },
        template: '<a :href="uri" class="mui-coupon mui-margin-10-0">\
          <img class="card" :src="img" />\
          <img v-show="status == 1" class="status" src="/lefang/Public/mall/images/overdue.png" />\
          <img v-show="status == 2" class="status" src="/lefang/Public/mall/images/used.png" />\
        </a>'
    })
})();

// upload-picture 组件
// options: props: ["screenList"]

(function() {
    var screen = Vue.extend({
        props: {
            name: {
                type: String,
                default: "分类"
            },
            cur: {
                twoWay: true,
                type: Number,
                default: 0
            },
            index: {
                type: Number,
                default: 0
            }
        },
        methods: {
            tab: function() {
                this.$dispatch('tab', this.index);
                event.preventDefault();
            }
        },
        computed: {
            activeObj: function() {
                return {
                    active: (this.cur == this.index)
                }
            }
        },
        template: '<li v-touch:tap="tab" class="mui-screen-cell" :class="activeObj">\
      <label class="mui-label">{{ name }}\
        <i class="mui-iconfont mui-icon-xiajiantou"></i>\
      </label>\
    </li>',
        ready: function() {}

    })
    Mui.screen = Vue.extend({
        data: function() {
            return {
                // now: 0,
            }
        },
        props: {
            screenList: {
                type: Array,
                default: [{
                    name: "分类1"
                }, {
                    name: "分类2"
                }, {
                    name: "分类3"
                }]
            },
            cur: {
                type: Number,
                default: 0,
                twoWay: true
            }
        },
        events: {
            "tab": function(index) {
                var list = Array.prototype.slice.call(this.$el.querySelectorAll(".mui-screen-item"))
                if (this.cur == index) {
                    list.forEach(function(el, i) {
                        el.classList.remove("show");
                        index = -1;
                    })
                } else {
                    list.forEach(function(el) {
                        el.classList.remove("show");
                    })
                    list[index].classList.toggle("show");
                }
                this.cur = index;
            }
        },
        components: {
            "mui-screen": screen
        },
        template: '<div class="mui-screen-wrapper"><ul class="mui-screen">\
      <mui-screen\
        v-for="item in screenList"\
        :name="item.name"\
        :cur.sync="cur"\
        :index="$index"\
      ></mui-screen>\
    </ul>\
    <slot>content will be replaced</slot>\
    </div>',
        ready: function() {}
    })
})();


(function() {
    Mui.radio = Vue.extend({
        props: {
            radio: {
                type: Object,
                default: {}
            },
            choosed: {
                type: String,
                default: ''
            }
        },
        computed: {
            classObject: function() {
                return {
                    "mui-icon-xuanzhong": this.choosed == this.radio.value,
                    "mui-icon-weixuan": this.choosed != this.radio.value
                }
            }
        },
        template: '<label class="mui-radio">\
            <i class="mui-radio-icon mui-iconfont" :class="classObject"></i>\
            <span class="mui-radio-label">{{radio.name}}</span>\
            <input class="mui-radio-input" type="radio" :value="radio.value" v-model="choosed" />\
        </label>'
    })
    Mui.radioGroup = Vue.extend({
        props: {
            radios: {
                type: Array,
                default: []
            },
            choosed: {
                type: String,
                default: ''
            }
        },
        components: {
            "mui-radio": Mui.radio
        },
        template: '<mui-radio :radio="radio" :choosed.sync="choosed" v-for="radio in radios"></mui-radio>'
    })
})();

// <v-switch :disabled="disabled"></v-switch>
(function() {
    Mui.switch = Vue.extend({
        props: {
            checked: {
                type: Boolean,
                default: false
            }
        },
        template: ''
    })
})();


(function() {
    var num = Vue.extend({
        props: {
            num: {
                type: Number,
                default: 0
            }
        },
        computed: {
            classString: function() {
                return 'mui-icon-' + this.num;
            }
        },
        template: '<i class="mui-iconfont" :class="classString"></i>',
        beforeCompile: function() {}
    })
    Mui.countDown = Vue.extend({
        props: {
            time: {
                type: Number,
                default: 0
            }
        },
        computed: {
            // classObj: function(){
            //     return {
            //         'mui-iconfont': true,
            //         'mui-icon-0':
            //     }
            // }
        },
        data: function() {
            return {
                hourlist: [0, 0],
                minlist: [0, 0],
                scdlist: [0, 0]
            }
        },
        components: {
            "mui-num": num
        },
        template: '<div class="mui-countdown">\
            <i class="mui-iconfont mui-icon-shijian"></i>\
            <mui-num v-for="item in hourlist" :num.sync="item" track-by="$index"></mui-num>\
            <i class="mui-iconfont mui-icon-maohao"></i>\
            <mui-num v-for="item in minlist" :num.sync="item"track-by="$index"></mui-num>\
            <i class="mui-iconfont mui-icon-maohao"></i>\
            <mui-num v-for="item in scdlist" :num.sync="item"track-by="$index"></mui-num>\
        </div>',
        beforeCompile: function() {
            function n2a(number) {
                var newArr = [];
                if (number <= 0) {
                    // do nothing
                } else {
                    var arr = String(number);
                    for (var i = 0; i < arr.length; i++) {
                        newArr.push(Number(arr[i]));
                    }
                }
                if (newArr.length == 0) {
                    newArr = [0, 0]
                } else if (newArr.length == 1) {
                    newArr.unshift(0)
                }
                return newArr
            }
            setInterval(function() {
                var totalscd = Math.floor((Number(this.time) * 1000 - new Date()) / 1000);
                var scd = totalscd % 60;
                var totalmin = Math.floor(totalscd / 60);
                var min = totalmin % 60;
                var totalhour = Math.floor(totalscd / 360);
                var hour = Math.floor(totalhour / 60)
                this.scdlist = n2a(scd);
                this.minlist = n2a(min);
                this.hourlist = n2a(hour);
            }.bind(this), 1000)
        }
    })
})();

(function() {
    Mui.vueMixinInit = {
        data: {
            userdata: {}
        },
        methods: {
            updateUserInfo: function(){
                return Vue.http.get('./index.php?m=Api&c=User&a=UserInfo',{
                    // app_auth_code: this.userdata.app_auth_code
                }).then(function(res){
                    if(res.data.status == 1){
                        // util.console.log(res.data.data);
                        this.userdata = _.assign({},this.userdata,res.data.data)
                        localStorage.userdata = JSON.stringify(this.userdata)
                    }else{
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this))
            }
        },
        beforeCompile: function() {
            // this.updateUserInfo().catch(function(err){alert(JSON.stringify(err))});
            this.userdata.current_mall_id = 1;
            util.geograph(function() {
                this.userdata = util.init();
                this.init();
                // 更新用户信息
                // this.updateUserInfo().catch(function(err){alert(JSON.stringify(err))});
            }.bind(this))
        }
    }
})();



(function() {
    Mui.switch = Vue.extend({
        props: {
            defaultCheck: {
                type: Boolean,
                default: true
            },
            onChange: {
                type: Function,
                default: function() {}
            }
        },

        computed: {
            classObj: function() {
                return {
                    active: !this.defaultCheck
                }
            }
        },

        methods: {
            switch: function() {
                this.defaultCheck ? this.defaultCheck = false : this.defaultCheck = true;
                this.onChange(this.defaultCheck);
            }
        },

        template: '<div class="mui-switch" v-touch:tap="switch" :class="classObj">\
            <div class="mui-switch-trigger"></div>\
        </div>'
    })
})()
