 new Vue({
     mixins: [Mui.vueMixinInit],
     el: '#app',
     data: {
         items: [],
         page: 1,
         totalpage: 1,
         allowrefresh: true
     },
     methods: {
         // 初始化
         init: function() {
             this.getList();
         },
         //  获取列表
         getList: function() {
             if (this.allowrefresh && this.page <= this.totalpage) {
                 this.allowrefresh = false;
                 Vue.http.get('./index.php?m=Api&c=IntegralGift&a=consume_list', {
                     userid: 13079, //临时id
                     page: this.page
                 }).then(function(res) {
                     this.allowrefresh = true;
                     if (res.data.status == 1) { //请求成功
                         if(!res.data.data){
                             return false;
                         }
                         var newItems = _.map(res.data.data.list, function(el) {
                             var list = {
                                 type: el.type,
                                 gift_integral: el.gift_integral,
                                 order_card: el.order_card,
                                 order_time: el.order_time
                             }
                             var obj = {
                                     nameType: '',
                                     integral: '',
                                     orderCard: '',
                                     orderTime: ''
                                 }
                                 // 赋值obj
                             if (list.type == 1) {
                                 obj.nameType = '消费';
                                 obj.integral = '-' + list.gift_integral;
                             } else if (list.type == 2) {
                                 obj.nameType = '充值';
                                 obj.integral = '+' + list.gift_integral;
                             } else {
                                 obj.nameType = '系统错误';
                                 obj.integral = list.gift_integral;
                             }
                             obj.orderCard = list.order_card;
                             obj.orderTime = new Date(list.order_time * 1000).Format("yyyy-MM-dd")
                             return obj;
                         });
                         this.items = _.concat(this.items, newItems); //追加新增;
                         this.page += 1; //页数增加
                         this.totalpage = res.data.data.totalpage;
                     } else {
                         Mui.message.toast({
                             msg: res.data.info
                         });
                     }
                 }.bind(this)).catch(function(err) {
                     this.allowrefresh = true;
                     //error
                     alert(err)
                 }.bind(this))
             }
         }
     }
 })
