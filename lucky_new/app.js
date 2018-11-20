//app.js
var config = {
  globalData: {
    appid: 'wx56df322e7c71e5d7',
    secret: '8cd88da07fe2dcc5367dce24258a5b4f',
    userInfo : null,
    Openid: null,
    Uid: null,
    u_Openid:null,
    headImg:null,
    viewId:null,
    card_id:null,
    scored:null,
    card_name:null,
    card_description:null,
    minscore:null,
    maxscore:null,
    score:null
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onLoad: function() {
  },
  onShow: function (options) {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      var userInfo = wx.getStorageSync('userInfo');
    }
  },
  globalData: {
    userInfo: null
  },
  luckyurl: 'https://www.luckymp.com'
}
App(config);
