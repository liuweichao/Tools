function webStorage(key,val){
  var len = arguments.length;
  if(len === 1){
    return window.localStorage.getItem(key);
  }else{
    window.localStorage.setItem(key,val);
  }
}

function webStorageRemove(key){
  var len = arguments.length;
  if(len === 0){
    window.localStorage.clear();
  }else{
    window.localStorage.removeItem(key);
  }
}

/*

webStorage(key)---获取
webStorage(key, val)---设置
webStorageRemove(key)---清除key的值
webStorageRemove()---清除全部值

 */
