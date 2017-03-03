var exec = require('child_process').exec;
var fs = require('fs')
var pathOs = require('path')
var path = 'videos'
var ffmpeg = require('ffmpeg');

fs.readdir(path, function(err, files){
  //err 为错误 , files 文件名列表包含文件夹与文件
  if(err){
    console.log('error:\n' + err);
    return;
  }
  var arr = [];
  files.forEach(function(file,i){
    fs.stat(path + '/' + file, function(err, stat){
      if(err){console.log(err); return;}

      var pathFile = path + '/' + file
      var basename = pathOs.basename(file, pathOs.extname(file))
      var pathFileNew = path + '/' + basename
      var pathFileNew2 = path +'/new' + '/' + basename

      if ( stat.isDirectory() ) return false

      try {
          new ffmpeg( pathFile , function (err, video) {
              if (!err) {
                  // console.log(video.metadata)
                  var bitrate = video.metadata.video.bitrate
                  // var h264 = 'ffmpeg -i '+ pathFile +' -vcodec mpeg4 '+pathFileNew +'_out.mp4'
                  // var h264 = 'ffmpeg -ss 00:00:10 -i '+ pathFile +' -vcodec mpeg4 -t 00:00:10 -b '+ bitrate +'k '+pathFileNew +'_out.mp4'
                  // var newVideo = 'ffmpeg -ss 00:00:00.05 -i '+ pathFile +' -s 640x1136  '+ pathFileNew +'_out.mp4'
                  var jpg = 'ffmpeg -ss 00:00:00 -i '+ pathFile +' -f image2 -y '+ pathFileNew +'.jpg'
                  // var jpg = 'ffmpeg -ss '+ video.metadata.duration.raw +' -i '+ pathFile +' -f image2 -y '+ pathFileNew +'.jpg'
                  var mpg = 'ffmpeg -i '+ pathFile +' -f mpeg1video -vf "crop=iw-mod(iw\\,2):ih-mod(ih\\,2)" -b '+ bitrate +'k '+ pathFileNew +'.mpg'
                  // var changeVideoSize = 'ffmpeg -i '+ pathFile +' '+ pathFileNew2 +'.mp4'
                  // console.log(changeVideoSize)
                  // exec(h264)
                  exec(jpg)
                  exec(mpg)
              } else {
                  console.log('Error: ' + err);
              }
          });
      } catch (e) {
          console.log(e.code);
          console.log(e.msg);
      }
    });

  });

});
