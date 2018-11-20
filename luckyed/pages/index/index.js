const app = getApp()

Page({
  data: {
    flag: true,
    zIndex: '0'
  },
  formSubmit: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid')
    var uid = wx.getStorageSync('uid')

    if (e.detail.value.mylable.length == 0) {
      wx.showToast({
        title: '请输入你的绝招！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: app.luckyurl +'/index.php?g=Api&m=Index&a=dolable',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          openid: openid,
          uid: uid,
          mylable: e.detail.value.mylable
        },
        success: function (res) {
          that.setData({
            code: res.data.code,
            message: res.data.message
          })
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1500
            })
            that.setData({
              mylable: ''
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 1000
            })
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
  },
  scoring: function() {
    this.setData({ flag: false, zIndex: '-1' })
  },
  hideModal: function () {
    this.setData({ flag: true, zIndex: '0' })
  }   
})