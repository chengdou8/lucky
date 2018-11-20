//mentor.js
const app = getApp()

Page({
  data: {
    flag: true,
    anonymous: false,
    statu: 'visible',
    money: 10
  },
  onLoad: function() {

  },
  payment: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Reward&a=index_show',
      method: 'POST',
      data: {
        openid: openid,
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.data.info.timeStamp,
          'nonceStr': res.data.info.nonceStr,
          'package': res.data.info.package,
          'signType': res.data.info.signType,
          'paySign': res.data.info.paySign,
          success: function (res) {
            if (res.errMsg == 'requestPayment:ok') {
              wx.request({
                url: app.luckyurl + '/index.php?g=Api&m=Reward&a=index',
                data: {
                  openid: openid,
                  uid: uid,
                  description: getApp().globalData.description,
                  title: getApp().globalData.ctitle,
                  anonymous: getApp().globalData.anonymous
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
                    that.setData({
                      description: '',
                      ctitle: '',
                      anonymous: ''
                    })
                    var currentTab = wx.setStorageSync('currentTab', '1');
                    wx.navigateTo({
                      url: '../../pages/seek/seek'
                    })
                  }
                }
              })
            }
          },
          'fail': function (res) {
            console.log('fail:' + JSON.stringify(res));
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  formSubmit: function (e) {
    getApp().globalData.description = e.detail.value.description;
    getApp().globalData.ctitle = e.detail.value.ctitle;
    getApp().globalData.anonymous = e.detail.value.anonymous;
    
    if (e.detail.value.description.length == 0) {
      wx.showToast({
        title: '请输入问题描述！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.ctitle.length == 0) {
      wx.showToast({
        title: '请输入关键字！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      this.payment();
    }
  },
  inputChange: function(e) {
    this.setData({
      anonymous: !this.data.anonymous
    })
  },
  rules: function () {
    this.setData({ flag: false, statu:'hidden'})
    console.log('rules--visibility:hidden')
  },
  hideModal: function () {
    this.setData({ flag: true, statu: 'visible' })
    console.log('hideModal--visibility:visible')
  }
})