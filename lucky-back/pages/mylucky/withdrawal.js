const app = getApp();

Page({
  data: {

  },
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');

    var name = getApp().globalData.nickName
    var image = getApp().globalData.headImg
    var xb = getApp().globalData.Sex
    var balance = getApp().globalData.Balance
    
    that.setData ({
      name: options.nickname,
      image: options.head_img,
      xb: options.sex,
      balance: options.balance
    })
  },
  formSubmit: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.re_money.length == 0) {
      wx.showToast({
        title: '请输入提现金额！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.name.length == 0) {
      wx.showToast({
        title: '请输入支付宝姓名！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.pay_id.length == 0) {
      wx.showToast({
        title: '请输入支付宝账号！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.wx_name.length == 0) {
      wx.showToast({
        title: '请输入微信号！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.phone.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.phone.length !== 11) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (!myreg.test(e.detail.value.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=dowithdrawal',
        data: {
          openid: openid,
          uid: uid,
          nickname: getApp().globalData.nickName,
          re_money: e.detail.value.re_money,
          name: e.detail.value.name,
          pay_id: e.detail.value.pay_id,
          wx_name: e.detail.value.wx_name,
          phone: e.detail.value.phone
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