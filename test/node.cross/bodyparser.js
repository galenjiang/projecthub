/**
 * Created by Galen on 2016/5/22.
 */
module.exports = function(stream,callback){
    var result = '';
    stream.on('data', function(data){
        result += data;
    });
    stream.on('end', function(){
        callback(result)
    });
};