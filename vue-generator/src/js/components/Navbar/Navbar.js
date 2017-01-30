module.exports = {
    template: '<div><ul class="mui-navbar">' +
        '<span class="mui-tab-line" :style="styleObj"></span>' +
        '<slot></slot>'+
        '</ul></div>',
    components: {
    },
    props: ['selected'],
    computed: {
        styleObj: function(){
            return {
                transform: 'translateX('+ 100*this.selected + '%)',
                width: 1 / this.$children.length * 100 + "%"
            }
        }
    }
}
