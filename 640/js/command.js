/* 跳转 */
$('[data-href]').on('click', function () {
    var href = $(this).attr('data-href')
    window.location.href = href
})

/*　后台接口　*/
var api = {
    baseUrl : 'http://m.palm-h.com/2017/anli/anli',
    methods: {
        base64: function (base, mode_num, arr_id, des_one, des_two, callback) {},
        pic: function (pic, callback) {
            var ajaxData = {
                pic: pic,
                openid: window.h6app_userInfo.openid
            }

            $.ajax({
                type: "GET",
                url: "http://case.html5case.cn/Casarte/submit",
                dataType: "json",
                data: ajaxData,
                success: function(data) {
                    if (callback !== undefined) {
                        callback.call(this,data)
                    }
                },
                error:function(data) {
                    console.error(data)
                }
            })
        }
    },
    getParam: function (name) {
        // console.log('name:',name);
        var val = null,
            reg = new RegExp('[\\?&]' + name + '=([^&]+)', 'i');
        if (reg.test(document.location.search)) {
            val = RegExp.$1;
        }
        return val ? decodeURIComponent(val) : null;
    }
}
