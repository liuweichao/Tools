var fs = require('fs')
var path = process.argv[2] || './img'
path = path +'/'

function readFileList(path, filesList) {
  var files = fs.readdirSync(path);
  var arr = []
  files.forEach(function (itm, index) {
    var stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList)
    } else {
      var obj = {};//定义一个对象存放文件的路径和名字
      obj.src = path + itm;//路径
      obj.filename = itm//名字
      arr.push(obj.src);
    }
  })
  filesList.push({path: path, arr: arr});

}

var filesList = [];
readFileList(path, filesList);

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
filesList.forEach(function (item, index) {
  imagemin(item.arr, item.path.replace('img','newImg'), {
      plugins: [
          imageminMozjpeg(),
          imageminPngquant({quality: '65-80'})
      ]
  }).then(files => {
      // console.log(files);
      //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  });

})


