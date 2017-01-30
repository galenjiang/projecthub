module.exports = {
    data: {
        userdata: {}
    },
    methods: {
        updateUserInfo: function() {
            return Vue.http.get(URL + 'index.php?m=Api&c=User&a=UserInfo', {}).then(function(res) {
                if (res.data.status == 1) {
                    // util.console.log(res.data.data);
                    this.userdata = _.assign({}, this.userdata, res.data.data)
                    localStorage.userdata = JSON.stringify(this.userdata)
                } else {
                    Mui.message.toast({
                        msg: res.data.info
                    })
                }
            }.bind(this))
        },

        // 从缓存中获取id
        getMallIdFromStorage: function() {
            return Q.promise(function(resolve, reject) {
                if (localStorage.userdata) {
                    var userdata = JSON.parse(localStorage.userdata);
                } else {
                    var userdata = {};
                }
                resolve(userdata.current_mall_id);
            })
        },

        // 调接口获取mall列表
        getMallList: function() {
            return Vue.http.get(URL + 'index.php?m=Api&c=Mall&a=mallList')
        },

        // 如果缓存中有id获取id对应商场资料
        getMallInfoHasId: function(id, list) {
            return Q.promise(function(resolve, reject) {
                var item = _.find(list, function(el) {
                    return el.id == id
                })
                if (item) {
                    resolve(item)
                } else {
                    resolve(list[0])
                }
            })
        },

        // 获取地理位置
        getGeo: function() {
            return Q.promise(function(resolve, reject) {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r) {
                    resolve({
                        lat: r.point.lat,
                        lng: r.point.lng
                    })
                })
            })

        },


        getMinMall: function(res) {
            console.log(res[0])
            return Q.promise(function(resolve) {
                var directArr = _.map(res[0], function(el) {
                    var direct = Math.sqrt((el.lat - res[1].lat) * (el.lat - res[1].lat) + (el.lng - res[1].lng) * (el.lng - res[1].lng))
                    return {
                        id: el.id,
                        name: el.name,
                        direct: direct,
                        lat: el.lat,
                        lng: el.lng
                    }
                })
                var min = _.reduce(directArr, function(memo, el) {
                    if (el.direct <= memo.direct) {
                        return el
                    } else {
                        return memo
                    }
                })
                resolve(min)
            })

        },

        // 获取商场信息
        getMallInfo: function() {
            return this.getMallIdFromStorage()
                .then(function(id) {
                    if (id) {
                        alert(1)
                        return this.getMallList()
                            .then(function(res) {
                                return res.data.data
                            })
                            .then(function(list) {
                                return this.getMallInfoHasId(id, list)
                            }.bind(this))

                    } else {
                        return Q.all([
                                this.getMallList()
                                .then(function(res) {
                                    return res.data.data
                                }),
                                this.getGeo()
                            ])
                            .then(function(res) {
                                return this.getMinMall(res)
                            }.bind(this))
                    }
                }.bind(this))


        }
    },
    beforeCompile: function() {
        // this.updateUserInfo().catch(function(err){alert(JSON.stringify(err))});
        this.userdata.current_mall_id = util.geo[0].id;
        util.geograph(function(mall) {
            this.userdata = util.init();
            this.init();

            // 更新用户信息
            // this.updateUserInfo().catch(function(err){alert(JSON.stringify(err))});

            // 后台统计uv,需要mallid作为依据。
            if (!sessionStorage.uvmallid) {
                Vue.http.get(URL + 'index.php?m=Api&c=Mall&a=getMallId', {
                    mallId: mall.id
                }).then(function() {
                    sessionStorage.uvmallid = mall.id
                }).catch(function(err) {
                    alert(err)
                })
            }

        }.bind(this))
    }
}
