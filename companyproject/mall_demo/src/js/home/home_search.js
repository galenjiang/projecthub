var app = new Vue({
    mixins: [Mui.vueMixinInit],

    components: {
        "mui-show-picture": Mui.showPiture,
        "mui-countdown": Mui.countDown
    },

    el: "#app",

    data: {
        userdata: {},
        orShow: false,
        dictionary: '',
        type: 'searchshop', // 切换的类型
        choose: 'searchshop', //搜索的类型
        favList: [],
        searchList: [],
        loading: false,
        page: 1,
        totalpage: 1
    },

    computed: {
        typeName: function() {
            var typeName = '商户'
            switch (this.type) {
                case "searchshop":
                    typeName = "商户";
                    break;
                case "searchinter":
                    typeName = "积分";
                    break;
                case "searchactive":
                    typeName = "活动"
                    break;
                default:
                    typeName = "商户";
            }
            return typeName;
        }
    },

    methods: {
        init: function() {
            //
            this.getFavList();
        },

        search: function(){
            if(!this.dictionary){
                Mui.message.toast({
                    msg: "请输入搜索字段"
                })
                this.searchList = [];
                event.preventDefault();
                return false;
            }
            this.page = 1;
            this.totalpage = 1;
            this.searchList = [];
            this.choose = this.type;
            this.getList();
            event.preventDefault();
        },

        getFavList: function(){
            Vue.http.get(url + 'index.php?m=Api&c=Search&a=search_hot',{
                mall_id: this.userdata.current_mall_id
            }).then(function(res){
                if(res.data.status == 1){
                    util.console.log(res.data.data);
                    this.favList = _.map(res.data.data, function(el){
                        return el;
                    }.bind(this))
                }else{
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this)).catch(function(err){
                alert(err);
            })
        },

        favsearch: function(key,type){
            this.page = 1;
            this.totalpage = 1;
            this.searchList = [];
            this.dictionary = key;
            this.type = type;
            this.choose = type;
            this.getList();
        },

        getList: function() {
            if(!this.loading && this.page <= this.totalpage){
                // 获取搜索列表
                this.loading = true;
                Vue.http.get(url + 'index.php?m=Api&c=Search', {
                    mall_id: this.userdata.mall_id,
                    key: this.dictionary,
                    a: this.choose
                }).then(function(res) {
                    this.loading = false;
                    util.console.log(res.data.data);
                    if(res.data.status == 1){
                        util.console.log(res.data.data.list);
                        var newList = _.map(res.data.data.list,function(el){
                            // 商户
                            var item = {};
                            if(this.choose == "searchshop"){
                                item.url = url + 'index.php?m=Home&c=Brand&a=brand_detail&id=' + el.id;
                                item.img = url + el.image;
                                item.textUpper = el.name;
                                item.textLower = el.floor + '-' + el.house_number;
                            }else if(this.choose == "searchinter"){
                                el.img = url + el.coverimg;
                                el.endtime = parseInt(el.endtime);
                                if (el.numbers) {
                                    el.url = url + 'index.php?m=Home&c=Integral&a=integral_info&limit=1&id=' + el.id
                                } else {
                                    el.url = url + 'index.php?m=Home&c=Integral&a=integral_info&limit=0&id=' + el.id
                                }
                                item = el;
                            }else if(this.choose == "searchactive"){
                                item.url = url + 'index.php?m=Home&c=Activity&a=activity_detail_original&id=' + el.id;
                                item.img = url + el.img;
                                item.textUpper = el.active_name;
                                item.textLower = el.begin_time + '-' + el.end_time;
                            }
                            return item;
                        }.bind(this))
                        this.searchList = _.concat(this.searchList, newList);
                        this.page += 1;
                        this.totalpage = res.data.data.totalpage;
                    }else{
                        Mui.message.toast({
                            msg: res.data.info
                        })
                    }
                }.bind(this)).catch(function(err) {
                    this.loading = false;
                    alert(err)
                }.bind(this))
            }
        },
        checkType: function() { //显示type选择
            this.orShow ? this.orShow = false : this.orShow = true;
            event.stopPropagation();
        },
        checkList: function(msg) { //选择list
            this.type = msg
            this.orShow = false
            event.preventDefault();
        },
        hidehint: function() {
            this.orShow = false;
        }
    }

})
