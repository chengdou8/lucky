const app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    unanswered: [],
    answered: [],
    myreward: []
  },
  onLoad: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=problem',
      data: {
        openid: openid,
        uid: uid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          unanswered: res.data.info
        })
      }
    })
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=answer',
      data: {
        openid: openid,
        uid: uid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          answered: res.data.info
        })
      }
    })
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=myreward',
      data: {
        openid: openid,
        uid: uid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          myreward: res.data.info
        })
      }
    })
  },
  answeredDetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/mylucky/myanswered?id=' + id
    })
  },
  answerDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/mylucky/myanswerDetail?id=' + id
    })
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})