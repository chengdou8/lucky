const app = getApp();

Page({
  data: {
    responderInfo: [],
    answer_list: [],
  },
  onLoad: function (options) {
    var that = this;
    getApp().globalData.AnswerDetailid = options.id;
    that.getData();
  },
  getData: function() {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Reward&a=reward_deal',
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
        var answer_list = [];
        answer_list = res.data.answer_list;
        var count = answer_list.length;
        that.setData({
          responderInfo: res.data.info,
          answer_list: answer_list,
          count: count,
          remaining_time: res.data.remaining_time
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');

    if (e.detail.value.content.length == 0) {
      wx.showToast({
        title: '请输入您的绝招！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: app.luckyurl + '/index.php?g=Api&m=Reward&a=do_reward_deal',
        data: {
          openid: openid,
          uid: uid,
          id: getApp().globalData.AnswerDetailid,
          content: e.detail.value.content
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          that.setData({
            code: res.data.code,
            message: res.data.message
          })
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 1500
            })
            that.getData();
            that.setData({
              content: ''
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1000
            })
            that.setData({
              content: ''
            })
          }
        }
      })
    }
  }
}) 