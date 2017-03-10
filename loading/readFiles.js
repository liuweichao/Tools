var fs = require('fs')
var path = process.argv[2] || './img'
path = path +'/'

function readFileList(path, filesList) {
	var files = fs.readdirSync(path);
	files.forEach(function (itm, index) {
		var stat = fs.statSync(path + itm);
		if (stat.isDirectory()) {
			//递归读取文件
			readFileList(path + itm + "/", filesList)
		} else {
			var obj = {};//定义一个对象存放文件的路径和名字
			obj.src = path + itm;//路径
			obj.filename = itm//名字
			filesList.push(obj);
		}

	})

}

var filesList = [];
readFileList(path, filesList);
console.log(filesList);