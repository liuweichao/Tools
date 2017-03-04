var option = [],
    mySwiper = null

/* loading */
pageFn.loading = function () {
    setTimeout(function () {
        toPage('welcome')
    }, 1000)
};

/* welcome */
pageFn.welcome = function () {
    $('.welcomeBtn').off('click').on('click', function () {
        var val = $('.inputUserName input').val()
        if (!val) {
            alert('请填写用户昵称')
            return false
        }
        toPage('list')
    })
};

/* 选项 */
pageFn.list = function () {
    $(".list-content li").off('click').click(function(){
        $(this).find('.checkbox').toggleClass('active');
    })

    var $checkBox = $('#list i')
    $('#list .btn').off('click').on('click', function () {
        $checkBox.each(function () {
            var $currentCheckBox = $(this)
            if ($currentCheckBox.hasClass('active')) {
                var checkIndex = $checkBox.index(this)
                option.push({checkIndex: checkIndex})
            }
        })
        if (option.length === 0) {
            alert('请选择你的愿望')
            return false
        }
        var numStr = []
        $.each(option, function (i, itme) {
            numStr.push(itme.checkIndex)
        })

        console.log(numStr.join())

        /* 生成模板number */
        api.methods.tlpNum(numStr.join(), $('.inputUserName input').val(), function (data) {
            tlpModeNum = data.mode_num
            editPage()
        })

    })

}

/* 编辑 */
function editPage () {
    /* 完成按钮 */
    $('.editBtn').off('click').on('click', function () {
        var $wrap = $(this).siblings('.preImgWrap');
        var $img = $wrap.find('img');
        uploadBase64($wrap, $img)
    })

    toPage('edit'+ (option[0].checkIndex+1))
    $.each(option, function (i, item) {
        var currentNum = item.checkIndex +1
        $('.edit'+currentNum+' .editBtn').off('click').on('click', function () {
            var last =  option.length - 1
            var $thatFinish = $(this),
                $thatInputWrap = $thatFinish.siblings('.inputWrap'),
                $colNum = $thatInputWrap.attr('data-colNum'),
                $thatRedInputStr = $thatInputWrap.find('.fontInput').val(),
                $thatImg = $thatFinish.siblings('.preImgWrap').find('img'),
                src = $thatImg.attr('src')

            item.font1 = $thatRedInputStr
            item.font2 = ''
            item.swiperObj = $('.edit'+currentNum).eq(0).clone().show()
            item.swiperObj
                .removeAttr('id')
                .append('<img src="img/arrow.png" class="arrow animated infinite fadeInUp" alt=""/>')
                .find('.editBtn').remove()

            item.swiperObj.find('.addBtn').hide()

            var $wrap = $thatFinish.siblings('.preImgWrap'),
                $img = $wrap.find('img'),
                base64 = ''

            if (src) {
                base64 = uploadBase64($wrap, $img)
            }

            /* 提交base64位 */
            api.methods.base64(
                base64,
                tlpModeNum,
                item.checkIndex,
                item.font1,
                item.font2,
                function (data) {
                    console.log(data.path)
                })


            if (i < last) {
                var nextNum = option[i+1].checkIndex +1
                toPage('edit'+ nextNum)
            } else {
                toPage('doneList')
            }
        })
    })

}

/* 编辑完成 */
pageFn.doneList = function () {
    var percent =  option.length / 9 * 100
    window.sumPercent = percent +'%'
    percent = parseInt(percent)
    $('.progressSlide div').width( percent +'%')
    $('.percent').text(percent +'%')

    function resetSwiper () {
        mySwiper.removeAllSlides()
        var slideStr = ''
        $.each(option, function (i, item) {
            if (!item.font1) {
                item.swiperObj.find('.verticalDiv').eq(0).hide()
            }
            slideStr+='<div class="swiper-slide">'+item.swiperObj.prop('outerHTML') +'</div>'
        })
        var copyAfterPre =  $('#afterPre').clone().removeAttr('id')
        slideStr+='<div class="swiper-slide">'+ copyAfterPre.show().prop('outerHTML') +'</div>'
        mySwiper.appendSlide(slideStr)
        mySwiper.slideTo(0, 0, false)
        toPage('swiper')
    }


    $('.doneList .button-box img').off('click').on('click', function () {
        resetSwiper()
        var textVal = $('textarea').val() || $('textarea').attr('data-default')
        api.methods.bless(textVal, tlpModeNum)
        $('.contentFont').html(textVal)
    })



}

/* 预览swiper */
mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical'
})
pageFn.swiper = function () {

    mySwiper.onResize()

    /* 修改 */
    $('.button-left').off('click').on('click', function () {
        resetState()
    })


    /* 生成 */
    $('.button-right').off('click').on('click', function () {
        toPage('sai')
    })


}

/*　红包动画　*/
pageFn.sai = function () {
    $('.saiSlider').transition({
        //'rotate': 10,
        y: 591,
        duration: 1000,
        easing: 'linear',
        complete: function() {
            toPage('share')

            /* 分享信息 */
            var shareData ={
                title: "我们的2016愿望清单大盘点", // 分享标题
                link: 'http://m.palm-h.com/2017/amway2/share.html?mode_num='+ tlpModeNum, // 分享链接
                imgUrl: 'http://m.palm-h.com/2017/amway2/jssdk/share2.jpg', // 分享图标
                desc: '2016我们携手完成了愿望清单的'+ parseInt(sumPercent) +'%，未来让我们一同勾画上更多的辉煌篇章！', // 分享描述,
                success:function(){

                },
                cancel:function(){
                }
            }
            console.log(shareData)
            weixin.share(shareData)
        }
    })
    $('.button-box img' ).on('click', function () {
        $('.shareMask').show().one('click', function () {
            $(this).hide()
        })
    })
}

/* 重置状态 */
function resetState () {
    var $addBtn = $('.addBtn'),
        $fileBtn= $('.fileBtn'),
        $file = $('input[type=file]'),
        $base64Img = $('.base64Img')


    $.each(option, function(i, item){
        var index = item.checkIndex,
            src =   $base64Img.eq(index).attr('src')
        if (!src) {
            $addBtn.eq(index).show()
            $fileBtn.eq(index).show()
            $file.eq(index).show()
        }
        //$base64Img.eq(index).attr('src', '')
    })


    option = []
    toPage('list')
}

$(function () {
    showFont();
    setTimeout(function () {
        load().then(function () {
            toPage('loading')
        })
    },500)


    /* 上传预览 */
    var $preImgWrap = $(".preImgWrap"),
        $addBtn = $('.addBtn')
        $fileBtn = $('.fileBtn');
    preViewImg($preImgWrap, function (index) {
        $addBtn.eq(index).hide()
        $fileBtn.eq(index).hide()
    });

});
