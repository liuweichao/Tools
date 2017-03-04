
innerPageFn.innerPage1 = function () {
    $('.innerPage1 .btn').on('click', function () {
        toInnerPage('innerPage2')
    })
}

innerPageFn.innerPage2 = function () {
    //gesture($('.iconChange').get(0))

    /* 点击上传 */
    preViewImg($('.addImgBtn input'), function (base) {
        $('.addImgBtn').hide()
        var $previewImg = $('<img class="base64Img" src="'+ base +'" alt="" />')
        $previewImg.css({
            'width': '100%',
            'max-width': 'none',
            'position': 'absolute',
            'left': 0,
            'top': 0
        }).prependTo('#wrap')

        gesture($previewImg.get(0))

    })

    /* 重新拍照 */
    preViewImg($('.resetImg input'), function (base) {
        $('.base64Img').attr('src', base)
    })


    $('#wrap').on('click', '.iconChange .remove', function () {
        $(this).parent().remove()
    })

    $('.iconWrap .icon').on('click', function () {
        var $that = $(this),
            $iconChange = $('.iconChange'),
            $img = $that.find('img'),
            src = $img.attr('src')
        if ($iconChange.length >0 ) {
            $('.iconChange img').attr('src', src)
        } else {
            var $iconChange = $('<div class="iconChange">\
                <img src="'+ src +'" alt=""/>\
                <div class="remove"></div>\
                </div>').appendTo('#wrap')

            window.testLeft = $('.iconChange').position().left
            window.testTop = $('.iconChange').position().top

            gesture($iconChange.get(0))
        }

    })


    $('.createImg').on('click', function () {
        if ($('.addImgBtn').is(':visible')) {
            alert('请选择图片')
            return false
        }

        uploadBase64(
            $('#wrap'),
            $('.base64Img'),
            $('.iconChange'),
            $('.logo2')
        ).then(function (base64) {
            $('.showImg img').attr('src', base64)
            toInnerPage('innerPage3')
            // getRedPacket()
        })
    })
}

$(function () {
    var swiper1 = null

    load().then(function () {
        var oImg = api.getParam('img')
        if (oImg) {
            $('.page1').remove()
        } else {
            $('.page1_2').remove()
        }
        swiper1 = new Swiper('.swiper-container', {
            direction: 'vertical',
            onInit: function(swiper){
                swiperAnimateCache(swiper)
                swiperAnimate(swiper)
            },
            onSlideChangeEnd: function(swiper){
                swiperAnimate(swiper)
                if (swiper.isEnd) {

                    //swiper.lockSwipes()
                }
            }
        })
    })


    //swiper1.lockSwipes()
    toInnerPage('innerPage1')

    $('.innerPage1 .btn').on('click', function () {
        swiper1.lockSwipes()
    })


    $('.playBtn').on('click', function () {
        var $video = $('video').show()
        var video = $video.get(0)
        video.width = document.documentElement.clientWidth
        video.height = document.documentElement.clientHeight
        $video.on('play', function () {
            pauseMusic()
        })
        $video.on('pause', function () {
            playMusic()
        })
        video.play()


    })

    /* innerPage3 */
    var $showBigWrap = $('.showBigWrap')
    $('.small>div').on('click', function () {
        var index = $(this).index()
        $showBigWrap.hide().eq(index).show()
    })

    $showBigWrap.find('.remove').on('click', function () {
        $(this).parent().hide()
    })

    $('.shareBtn').on('click', function () {
        $('.share').show().one('click', function () {
            $(this).hide()
        })
    })


    $('.again').on('click', function () {
        $('.innerPage').hide().eq(1).show()
    })

    document.addEventListener('WeixinJSBridgeReady',function(){
        // alert('ready')
        $('#audio2').get(0).play()
        $('#audio2').get(0).pause()
    })

    $('.photo').on('webkitAnimationEnd animationend', function () {
        // alert(1)
        pauseMusic()
        $('#audio2').get(0).play()

        $('.photoBg').on('webkitAnimationEnd animationend', function () {
            playMusic()
        })
    })


})