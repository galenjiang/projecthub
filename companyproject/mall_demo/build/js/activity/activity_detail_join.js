new Vue({mixins:[Mui.vueMixinInit],el:"#app",data:{userdata:{},activeinfo:{},shareMaskStatus:!1,statusJoin:!1},methods:{init:function(){this.getInfo().then(function(){util.console.log(this.activeinfo),this.shareInit()}.bind(this))["catch"](function(t){alert(t)})},getInfo:function(){return Vue.http.get(url+"index.php?m=Api&c=Active&a=booking_active",{mall_id:this.userdata.current_mall_id,id:this.id}).then(function(t){util.console.log(t.data),1==t.data.status?this.activeinfo=_.assign({},_.mapValues(t.data.data,function(t,i){return"img"==i&&(t=url+t),"iscoupon"==i&&t>=1&&(this.statusJoin=!0),t}.bind(this)),{url:url+"index.php?m=Home&c=Activity&a=activity_detail_join_fill&id="+this.id}):Mui.message.toast({msg:t.data.info})}.bind(this))},share:function(){this.shareMaskStatus?this.shareMaskStatus=!1:this.shareMaskStatus=!0},shareInit:function(){var t={title:"乐坊商场",desc:this.activeinfo.active_name,link:window.location.href+"&mall="+this.mall||this.userdata.current_mall_id,imgUrl:this.activeinfo.img,success:function(){Mui.message.toast({msg:"分享成功"})},cancel:function(){Mui.message.toast({msg:"系统错误"})}};wx.onMenuShareAppMessage(t),wx.onMenuShareTimeline(t)}},created:function(){this.id=util.urlQuery().id}});