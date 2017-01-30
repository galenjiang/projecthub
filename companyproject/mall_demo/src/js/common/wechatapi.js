
(function() {
    function jsApiCall(data,callback) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            data,
            callback
        );
    }
    wechat = {};
    wechat.pay = function(data,callback) {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
            }
        } else {
            jsApiCall(data,callback);
        }
    }
    window.wechat = wechat;
})()
