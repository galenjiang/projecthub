new Vue({mixins:[Mui.vueMixinInit],el:"#setting_suggest_list",data:{userdata:{},items:[],page:1,totalpage:1,allowrefresh:!0},methods:{init:function(){this.getList()},getList:function(){this.allowrefresh&&this.page<=this.totalpage&&(this.allowrefresh=!1,Vue.http.get("./index.php?m=Api&c=Mall&a=feedback",{}).then(function(t){if(1==t.data.status){var e=_.map(t.data.data.list,function(t){var e={time:t.createtime,title:t.title,url:"./index.php?m=Home&c=User&a=setting_suggest_detail&id="+t.id};return e});this.items=_.concat(e,this.items),this.page++}else Mui.message.toast({msg:t.data.info});this.allowrefresh=!0}.bind(this))["catch"](function(t){this.allowrefresh=!0,alert(t)}.bind(this)))}}});