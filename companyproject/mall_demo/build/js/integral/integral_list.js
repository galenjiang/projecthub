var page=new Vue({mixins:[Mui.vueMixinInit],components:{"mui-tabs--implict":Mui.tabsImplict,"mui-countdown":Mui.countDown,"mui-banner":Mui.banner},el:"#app",data:{userdata:{},tablists:[{name:"全部礼品"},{name:"我能兑换"}],tabCur:0,"class":0,page:1,totalpage:1,allowrefresh:!0,catelogList:[],giftList:[]},computed:{catelogStyleObj:function(){return{width:1.8*this.catelogList.length+"rem"}}},watch:{tabCur:function(t,i){this.page=1,this.totalpage=1,this.giftList=[],this.getGiftList()}},methods:{init:function(){this.getCateList(),this.getGiftList()},getCateList:function(){Vue.http.get(url+"index.php?m=Api&c=IntegralGift&a=giftClass",{mall_id:this.userdata.current_mall_id}).then(function(t){util.console.log(t.data.data),1==t.data.status?this.catelogList=_.map(t.data.data,function(t){return t.img=url+t.img,t.href=url+"index.php?m=Home&c=Integral&a=integral_sorting&id="+t.id+"&name="+t.name+"&weight="+t.weight,t}):Mui.message.toast({msg:t.data.info})}.bind(this))["catch"](function(t){alert(t)})},getGiftList:function(){this.allowrefresh&&this.page<=this.totalpage&&(this.allowrefresh=!1,Vue.http.get(url+"index.php?m=Api&c=IntegralGift&a=gift_list",{mall_id:this.userdata.current_mall_id,is_exchange:this.tabCur+1,page:this.page}).then(function(t){if(this.allowrefresh=!0,1==t.data.status){util.console.log(t.data.data),this.loading=!1,this.totalpage=t.data.data.totalpage,this.page+=1;var i=_.map(t.data.data.list,function(t){return t.img=url+t.coverimg,t.endtime=Number(t.endtime),t.numbers?t.url=url+"index.php?m=Home&c=Integral&a=integral_info&limit=1&id="+t.id:t.url=url+"index.php?m=Home&c=Integral&a=integral_info&limit=0&id="+t.id,t});this.giftList=_.concat(this.giftList,i)}else Mui.message.toast({msg:t.data.info})}.bind(this))["catch"](function(t){this.allowrefresh=!0,alert(t)}.bind(this)))}}});