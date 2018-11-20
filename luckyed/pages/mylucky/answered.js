const app = getApp();

Page({
  data: {
    userinfo:[],
    result:[]
  },

  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    getApp().globalData.AnswerDetailid = options.id;

    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=answer_c',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.AnswerDetailid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          userinfo: res.data.userinfo,
          result: res.data.result,
          remaining_time: res.data.remaining_time
        })
      }
    })
  }
})