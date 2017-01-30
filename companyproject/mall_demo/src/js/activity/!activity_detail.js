new Vue({
    el: "#activitydetail",
    data: {
        userdata:{},
        active_name:{},
        begin_time:'',
        end_time:'',
        phone:'',
        id:'',
        about:'',
        img:''
    },
    methods: {
        init:function(){
                alert(this.id,this.userdata.current_mall_id)
                Vue.http.get(url + 'index.php?m=Api&c=Active&a=booking_active',{
                    mall_id: this.userdata.current_mall_id,
                    id:this.id
                }).then(function(res){ //success
                    console.log(res)
                       var getData = res.data.data; //数据
                       this.active_name = getData.active_name;
                       this.begin_time = getData.begin_time;
                       this.end_time = getData.end_time;
                       this.phone = getData.phone[0];
                       this.about = getData.about;
                       this.img = getData.img;
                }.bind(this),function(){ //error
                }.bind(this))
            },
        join: function() {
            window.location.href = url + 'index.php?m=Home&c=Activity&a=activity_detail_join&id=' + this.id;
        }
    },
    beforeCompile: function() {

    },
    ready: function() {
        var getId =  util.urlQuery(); //获取页面id
        this.id = getId.id
        this.userdata = util.init();
        this.init();
    }
})
