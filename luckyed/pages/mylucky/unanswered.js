const app = getApp();

Page({
  data: {
    AnswerDetailid:'',
    userinfo: [],
    result: []
  },

  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    getApp().globalData.AnswerDetailid = options.id;

    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=problem_c',
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
          result: res.data.result
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');

    if (e.detail.value.questionC.length == 0) {
      wx.showToast({
        title: '请输入您的专业观点！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.questionC.length < 70) {
      wx.showToast({
        title: '答疑不少于70字！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=doproblem',
        data: {
          openid: openid,
          uid: uid,
          id: getApp().globalData.AnswerDetailid,
          r_content: e.detail.value.questionC
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
            that.setData({
              content: ''
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
  }
})