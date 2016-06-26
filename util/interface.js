var Interface = function(name, methods){
    if(arguments.length != 2){
        throw new Error('the Interface must be 2 arguments')
    }
    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++){
        if(typeof methods[i] !== 'string'){
            throw new Error('the 2nd argument should be a Array, and it\'s elements must be String')
        }
        this.methods.push(methods[i])
    }
};

Interface.ensureImplements = function(instance){
    if(arguments.length < 2){
        throw new Error('this method\'s arguments should be more than 2')
    }
    for(var i = 1, len = arguments.length; i < len; i++){
        var instanceInterface = arguments[i];
        if(instanceInterface.constructor !== Interface){
            throw new Error('the 2nd argument should be a Interface instance')
        }
        for(var j = 0;j < instanceInterface.methods.length; j++){
            var method = instanceInterface.methods[j];

            if(!instance[method] || typeof instance[method] !== 'function'){
                throw new Error('the method \'' + method + '\' isn\'t implemented')
            }
        }
    }

};

module.exports = Interface;