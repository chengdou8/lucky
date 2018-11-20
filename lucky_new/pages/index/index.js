const app = getApp()

Page({
  data: {
    headImg: wx.getStorageSync('userInfo').head_img
  },
  onLoad: function () {
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    console.log("openid:" + openid)
    console.log("uid:" + uid)
    if (openid == '' && uid == '') {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  home: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  mylucky: function () {
    wx.redirectTo({
      url: '/pages/mylucky/mylucky'
    })
  },
  formSubmit: function (e) {
    var that = this;
    var openid = wx.getStorageSync('userInfo').unionid
    var uid = wx.getStorageSync('uid')
    console.log(openid)
    console.log(uid)
    if (e.detail.value.mymajor.length == 0) {
      wx.showToast({
        title: '输入你的专业！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.mytaste.length == 0) {
      wx.showToast({
        title: '输入专业心得！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: app.luckyurl + '/index.php?g=Api&m=Index&a=dolable',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          openid: openid,
          uid: uid,
          mylable: e.detail.value.mymajor,
          card_description: e.detail.value.mytaste
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
              mymajor: '',
              mytaste: ''
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/detail/detail?id=' + res.data.info
              })
            }, 1500)
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
  }
})