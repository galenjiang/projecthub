module.exports = {
    template: '<li v-touch:tap="changeSelected" class="mui-tab-item" :class="{\'is-selected\': $parent.selected == index}">' +
    '<slot></slot>' +
    '</li>',
    props: ['index'],
    methods: {
        changeSelected: function(){
            this.$parent.selected = this.index;
        }
    }
}
