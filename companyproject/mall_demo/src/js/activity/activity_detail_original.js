
 var app = new Vue({
     mixins: [Mui.vueMixinInit],
     el: '#activity_detail_original',
     data: {
         userdata: {},
         activeinfo: {},
         id: '',
         mall: null,
         statusJoin: false,
         fastClick: true,
         shareMaskStatus: false
     },
     methods: {
         init: function() {
             Vue.http.get(url + 'index.php?m=Api&c=Active&a=public_active', {
                 mall_id: this.mall || this.userdata.current_mall_id,
                 id: this.id
             }).then(function(res) { //success
                 util.console.log(res.data);
                 if(res.data.status == 1){
                    //  var getData = res.data.data; //数据
                    //  this.active_name = getData.active_name;
                    //  this.begin_time = getData.begin_time;
                    //  this.end_time = getData.end_time;
                    //  this.phone = getData.phone[0];
                    //  this.about = getData.about;
                    //  this.img = url + getData.img

                     this.activeinfo = _.mapValues(res.data.data,function(el,key){
                         if(key == 'img'){
                             el = url + el;
                         }
                         return el
                     })
                     if(this.activeinfo.iscoupon && this.activeinfo.iscoupon >= 1){
                         this.statusJoin = true;
                     }
                 }else{
                     Mui.message.toast({
                         msg: res.data.info
                     })
                 }
             }.bind(this), function(res) { //error
                 Mui.message.toast({
                     msg: res.data
                 })
                 util.console.log(res.data)
             })
            //  分享初始化
            this.shareInit();
         },
         join: function() {
             if(this.fastClick){
                 this.fastClick = false;
                 // this.statusJoin ? this.statusJoin = false : this.statusJoin = true;
                 Vue.http.get('./index.php?m=Api&c=Active&a=repeat_public', {
                    //  app_auth_code: this.userdata.app_auth_code,
                     mall_id: this.mall || this.userdata.current_mall_id,
                     active_id: this.id
                 }).then(function(res) {
                     this.fastClick = true;
                     if (res.data.status == 1) { //请求成功
                         if (this.statusJoin == false) {
                             this.statusJoin = true;
                         } else if (this.statusJoin == true) {
                             Mui.message.toast({
                                 msg: "您已参加本活动"
                             })
                         }
                     } else { //请求不成功
                         Mui.message.toast({
                             msg: res.data.info
                         })
                     }
                 }.bind(this), function(res) {
                     this.fastClick = true;
                     Mui.message.toast({
                         msg: res.data
                     })
                     util.console.log(res.data);
                 })
             }
         },
         shareInit: function() {
             var params = {
                 title: '乐坊商场', // 分享标题
                 desc: this.activeinfo.active_name,
                 link: window.location.href + '&mall=' + this.mall || this.userdata.current_mall_id, // 分享链接
                 imgUrl: this.activeinfo.img, // 分享图标
                 success: function() {
                     Mui.message.toast({
                         msg: "分享成功"
                     })
                 },
                 cancel: function() {
                     Mui.message.toast({
                         msg: "系统错误"
                     })
                 }
             }
             wx.onMenuShareAppMessage(params);
             wx.onMenuShareTimeline(params);
         },
         share: function(){
             this.shareMaskStatus ? this.shareMaskStatus = false : this.shareMaskStatus = true;
             event.preventDefault();
         }
     },
     created: function(){
         //获取页面id
         var queryObj = util.urlQuery();
         this.id = queryObj.id;
         this.mall = queryObj.mall;
     }
 })
