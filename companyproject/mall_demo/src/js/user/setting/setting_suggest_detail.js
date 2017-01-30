new Vue({
	mixins: [Mui.vueMixinInit],
	el:'#setting_suggest_detail',
	data:{
		userdata: {},
		id:'',
		title:'',
		content:'',
		reply:''
	},
	methods:{
		init:function(){
			Vue.http.get('./index.php?m=Api&c=Mall&a=feedbackInfo',{
				// app_auth_code: this.userdata.app_auth_code,
				id:this.id
			}).then(function(res){
				console.log(res)
				if(res.data.status ==1){
					var getData = res.data.data ;//数据集
					this.title = getData.title; //标题
					this.content = getData.comment //内容
					this.reply = getData.reply; //回复

					var imlength = getData.img;
					for(i=0; i<imlength; i++){
						var newList = '<li class="suggest-image-info-img" style="background:url('+getData.img[i].img_big_path+');background-size:cover;"></li>'
						$("#getImg").apend(newList);
					}
				}else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
			}.bind(this)).catch(function(err){
                alert(err)
            })
		}
	},
	created: function(){
		var urlObj = util.urlQuery();
		this.id = urlObj.id;
	}
})
