module.exports = {
    template: '<div v-show="index == $parent.selected" class="mui-tab-container-item"><slot></slot></div>',
    props: ['index'],
    ready: function(){
    }
}
