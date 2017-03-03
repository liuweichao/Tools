# 上传，图片调整

##依赖jquery，hammer.js

``` javascript
var p = new PreViewImg({
  file: 'preViewFile',  //file的class
  compressWrap: 'compressWrap', //压缩后存放的class
  base64Img: 'base64Img', //生成压缩的img的class
  onFileChange: function () {} //file的change事件
})

$('#submit').on('click', function () {
  var base64 = p.compressBase64() //实例方法，返回base64
  $('#new').attr('src', base64)
})

```
