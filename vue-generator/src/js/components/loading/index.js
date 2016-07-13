var loadingConfig = require('./Loading')
var LoadingConponent = Vue.extend(loadingConfig);
var instance = null;

function getAnInstance() {
    var container = document.createElement('div');
    document.body.appendChild(container)
    return new LoadingConponent({
        el: container,
        data: function(){
            return {
                loading: true
            }
        }
    })
}
// var loadingInstance = getAnInstance();

function show(){
    if(!instance){
        instance = getAnInstance();
    }else{
        instance.loading = true;
    }
}


function hide(){
    if(!instance){
        throw new Error('dom of loading isn\'t existed');
    }else{
        instance.loading = false;
    }
}


module.exports = {
    show: show,
    hide: hide
}
