function loading (params) {
    var dtd = $.Deferred()
    var defaults = {
        loadArr: [],
        processFn: function () {},
        bgMusicSrc: '',
        bgMusicController: 'music',
        noBgMusicClass:'nomusic',
        bgMusicLoop: true
    }
    params = $.extend({}, defaults, params)

    var arr = params.loadArr

    var count =0;
    var len = arr.length

    function process () {
        count++;
        var percent = parseInt(count/len*100)+"%"
        params.processFn.call(this, percent)
        if (count>=len){
            audio.play()
            dtd.resolve()
        }
    }

    /* img  */
    for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = arr[i].src;
        img.onload = function () {
            process()
        }
    }

    /* sound */
    var soundBol = true;
    var $bgMusicController = $("."+params.bgMusicController)
    var audio = new Audio();
    audio.src = params.bgMusicSrc
    audio.loop = 'loop'
    $bgMusicController.click(function () {
        if(soundBol){
            $bgMusicController.addClass(params.noBgMusicClass)
            audio.pause();

        }else{
            $bgMusicController.removeClass(params.noBgMusicClass)
            audio.play()
        }
        soundBol=!soundBol
    });
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio.play()
        })
    }
    document.addEventListener("WeixinJSBridgeReady",function(){
        audio.play()
    },false);


    return dtd
}