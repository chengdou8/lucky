const app = getApp();

Page({
  data: {
    money: 3
  },
  onLoad: function (options) {
    getApp().globalData.tag_Id = options.id;
    getApp().globalData.u_Openid = options.u_openid;
    this.getData();
  },
  getData: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=qanswer',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.tag_Id,
        u_openid: getApp().globalData.u_Openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          info:res.data.info,
          userinfo: res.data.userinfo,
          qalabelinfo: res.data.qalabelinfo
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    getApp().globalData.description = e.detail.value.content;

    if (e.detail.value.description.length == 0) {
      wx.showToast({
        title: '请输入您的问题！',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      that.payment();
    }
  },
  payment: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=qanswer',
      method: 'POST',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.tag_Id,
        u_openid: getApp().globalData.u_Openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.jsApiParameters.timeStamp)
        wx.requestPayment({
          'timeStamp': res.data.jsApiParameters.timeStamp,
          'nonceStr': res.data.jsApiParameters.nonceStr,
          'package': res.data.jsApiParameters.package,
          'signType': res.data.jsApiParameters.signType,
          'paySign': res.data.jsApiParameters.paySign,
          success: function (res) {
            if (res.errMsg == 'requestPayment:ok') {
              wx.request({
                url: app.luckyurl + '/index.php?g=Api&m=Index&a=doqanswer',
                data: {
                  openid: openid,
                  uid: uid,
                  card_id: getApp().globalData.tag_Id,
                  u_openid: getApp().globalData.u_Openid,
                  content: getApp().globalData.description
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
                      content: ''
                    })
                    wx.redirectTo({
                      url: '../../pages/point/point'
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
})