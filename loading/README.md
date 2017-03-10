# 上传，图片调整

##依赖jquery

``` javascript
var arr = [ { src: 'img/7.png' },
    { src: 'img/7right.png' },
    { src: 'img/7left.png' },
    { src: 'img/arrow.png' },
    { src: 'img/music.png' },
    { src: 'img/nomuisc.png' },
].concat(
    [ { src: 'img/alert/big.png' },
        { src: 'img/alert/bigSlide.png' },
        { src: 'img/alert/middle.png' },
        { src: 'img/alert/middleyes.png' },
        { src: 'img/alert/middleno.png' },
        { src: 'img/alert/next.png' },
        { src: 'img/alert/weixinlogo.png' } ]
)
loading({
  loadArr: arr, //加载数组
  processFn: function (percent) { //进度
    console.log(percent+"%")
  },
  bgMusicSrc: 'img/1.mp3',  //背景音乐地址
  bgMusicController: 'music', //控制的class
  noBgMusicClass:'fuck',  //停止的class
  bgMusicLoop: true //是否一致循环
}).then(function () {
  console.log('加载完成')
})
```

``` javascript
node modulesArray.js img
```