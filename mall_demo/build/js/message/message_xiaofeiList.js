new Vue({mixins:[Mui.vueMixinInit],el:"#app",data:{items:[],page:1,totalpage:1,allowrefresh:!0},methods:{init:function(){this.getList()},getList:function(){this.allowrefresh&&this.page<=this.totalpage&&(this.allowrefresh=!1,Vue.http.get("./index.php?m=Api&c=IntegralGift&a=consume_list",{userid:13079,page:this.page}).then(function(t){if(this.allowrefresh=!0,1==t.data.status){if(!t.data.data)return!1;var e=_.map(t.data.data.list,function(t){var e={type:t.type,gift_integral:t.gift_integral,order_card:t.order_card,order_time:t.order_time},a={nameType:"",integral:"",orderCard:"",orderTime:""};return 1==e.type?(a.nameType="消费",a.integral="-"+e.gift_integral):2==e.type?(a.nameType="充值",a.integral="+"+e.gift_integral):(a.nameType="系统错误",a.integral=e.gift_integral),a.orderCard=e.order_card,a.orderTime=new Date(1e3*e.order_time).Format("yyyy-MM-dd"),a});this.items=_.concat(this.items,e),this.page+=1,this.totalpage=t.data.data.totalpage}else Mui.message.toast({msg:t.data.info})}.bind(this))["catch"](function(t){this.allowrefresh=!0,alert(t)}.bind(this)))}}});