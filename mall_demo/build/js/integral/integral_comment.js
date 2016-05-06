var app=new Vue({mixins:[Mui.vueMixinInit],components:{"mui-tabs":Mui.tabs},el:"#integralComment",data:{userdata:{},tablist:[{name:"图文详情"},{name:"评价"}],desc:"",commentlist:[],cur:0,id:-1,limit:"",payShow:!1,count:1,infodata:{content:" "}},methods:{init:function(){this.getInfo(),this.updateUserInfo()["catch"](function(t){alert(t)})},getInfo:function(){Vue.http.get(url+"index.php?m=Api&c=IntegralGift&a=comment_list&id=12",{gift_id:this.id}).then(function(t){1==t.data.status?(util.console.log(t.data.data),t.data.data.gift_data[0]&&(this.infodata=_.mapValues(t.data.data.gift_data[0],function(t,a){return t})),this.commentlist=_.map(t.data.data.list,function(t){return t.header_url=url+t.header_url,t.img=_.map(t.img,function(t){return t=url+t}),t})):Mui.message.toast({msg:t.data.info})}.bind(this))["catch"](function(t){alert(t)})},openPay:function(){this.payShow=!0,event.preventDefault()},closePay:function(){this.payShow=!1,event.preventDefault()},minus:function(){this.count<=1?Mui.message.toast({msg:"数量不能低于1件"}):this.count-=1},plus:function(){this.count+=1},pay:function(){Vue.http.get(url+"index.php?m=Api&c=IntegralGift&a=commit_order",{mall_id:this.userdata.current_mall_id,order_number:this.count,gift_id:this.id,gift_name:this.infodata.name,type:1==this.limit?1:2}).then(function(t){if(0==t.data.status)Mui.message.toast({msg:t.data.info});else if(1==t.data.status)window.location.href=url+"index.php?m=Home&c=Integral&a=integral_change_success";else{if("object"!=typeof t.data)throw new Error("系统错误");wechat.pay(t.data,function(t){"get_brand_wcpay_request:ok"==t.err_msg?window.location.href=url+"index.php?m=Home&c=Integral&a=integral_change_success":"get_brand_wcpay_request：cancel"==t.err_msg||Mui.message.toast({msg:"支付失败,请稍后再试"})})}}.bind(this))["catch"](function(t){alert(t)})}},events:{tab:function(t){this.cur=t}},created:function(){var t=util.urlQuery();this.id=t.id,this.cur=t.type,this.limit=t.limit}});