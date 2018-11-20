function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function load_start() {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  });
}
function load_end() {
  wx.hideToast();
}
function toast(title) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 2000
  })
}
function isDefine(value) {
  if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof (value) == 'undefined') {
    return false;
  } else {
    value = value + "";
    value = value.replace(/\s/g, "");
    if (value == "") {
      return false;
    }
    return true;
  }
}
function PostAll(serverURL, data, callback) {
  //data = stringToJson(data);
  //console.log(data);
  load_start();
  wx.request({
    url: serverURL,
    data: data,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      load_end();
      if (res) {
        if (callback) {
          callback(res);
        }
      }
    }
  })
}

/**
  *
  * json转字符串
  */
function stringToJson(data) {
  return JSON.parse(data);
}
/**
*字符串转json
*/
function jsonToString(data) {
  return JSON.stringify(data);
}
//判断是否json
function isJson(obj) {
  var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}
module.exports = {
  formatTime: formatTime,
  load_start: load_start,
  load_end: load_end,
  toast: toast,
  isDefine: isDefine,
  PostAll: PostAll,
  stringToJson: stringToJson,
  jsonToString: jsonToString,
  isJson: isJson,
}