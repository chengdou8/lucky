const app = getApp();
var is_exceptional = [];
Page({
  data: {
    flag: true,
    responderInfo: [],
    answer_list: []
  },
  onLoad: function (options) {
    var that = this;
    getApp().globalData.AnswerDetailid = options.id;
    that.getData()
  },
  getData: function() {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=reward_deal',
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
          remaining_time: res.data.remaining_time,
          count: res.data.count
        })
        getApp().globalData.reward_id = res.data.info.id
      }
    })
  },
  confirmAnswer: function() {
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=do_reward_deal',
      data: {
        openid: openid,
        uid: uid,
        is_exceptional: is_exceptional,
        reward_id: getApp().globalData.reward_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1000
          })
          that.getData()
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },
  listenCheckboxChange: function(e) {
    var id = e.detail.value
    this.setData({
      is_exceptional: is_exceptional.push(id)
    })
  },
  share: function () {
    this.setData({ flag: false })
  },
  closeshare: function () {
    this.setData({ flag: true })
  }
})