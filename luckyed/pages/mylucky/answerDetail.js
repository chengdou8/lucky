const app = getApp();

Page({
  data: {
    flag: true,
    responderInfo: [],
    answer_list: [],
  },
  onLoad: function(options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    getApp().globalData.AnswerDetailid = options.id;

    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=reward_deal',
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
          responderInfo: res.data.info,
          answer_list: res.data.answer_list,
          remaining_time: res.data.remaining_time
        })
      }
    })
  },
  share: function () {
    this.setData({ flag: false })
  },
  closeshare: function () {
    this.setData({ flag: true })
  }
})  