new Vue({
    el: '#wifi_success_bg',
    data: {
        classObj: {
            'mui-icon-weixuan': true,
            'mui-icon-xuanzhong': false
        }
    },
    methods: {
        checkRead: function(data) {
            var hasTrue = this.classObj['mui-icon-weixuan'];
            if (hasTrue) {
                this.classObj = {
                    'mui-icon-weixuan': false,
                    'mui-icon-xuanzhong': true
                }
            } else {
                this.classObj = {
                    'mui-icon-weixuan': true,
                    'mui-icon-xuanzhong': false
                }
            }

            util.console.log(this.data)
        }
    }

})
