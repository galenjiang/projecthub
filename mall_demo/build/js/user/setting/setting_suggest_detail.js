new Vue({mixins:[Mui.vueMixinInit],el:"#setting_suggest_detail",data:{userdata:{},id:"",title:"",content:"",reply:""},methods:{init:function(){Vue.http.get("./index.php?m=Api&c=Mall&a=feedbackInfo",{id:this.id}).then(function(t){if(console.log(t),1==t.data.status){var e=t.data.data;this.title=e.title,this.content=e.comment,this.reply=e.reply;var a=e.img;for(i=0;i<a;i++){var n='<li class="suggest-image-info-img" style="background:url('+e.img[i].img_big_path+');background-size:cover;"></li>';$("#getImg").apend(n)}}else Mui.message.toast({msg:t.data.info})}.bind(this))["catch"](function(t){alert(t)})}},created:function(){var t=util.urlQuery();this.id=t.id}});