const app = getApp();

Page({
  data: {
    userinfo: [],
    result: [],
    info:[]
  },

  onLoad: function (options) {
    getApp().globalData.AnswerDetailid = options.id;
    this.getData();
  },
  getData: function() {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=answer_c',
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
          info:res.data.info
        })
        getApp().globalData.u_Openid = res.data.info.openid
        getApp().globalData.card_Id = res.data.result.card_id
      }
    })
  },
  slider4change: function (e) {
    getApp().globalData.Score = e.detail.value
  },
  giveScore: function () {
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=doview',
      data: {
        openid: openid,
        uid: uid,
        card_id: getApp().globalData.card_Id,
        u_openid: getApp().globalData.u_Openid,
        score: getApp().globalData.Score,
        type: 3,
        view_id: getApp().globalData.AnswerDetailid
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
  } 
})