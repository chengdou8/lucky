const app = getApp();

Page({
  data:{
    min:'55',
    max:'63',
    blockSize: 28,
    blockColor: "#5a3c2f",
    showValue: true
  },
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('userInfo').unionid
    var uid = wx.getStorageSync('userInfo').id
    app.globalData.card_id = options.id
    wx.setStorageSync('id', options.id)
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=view',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        openid: openid,
        id: options.id,
        uid: uid
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        if (res.data.code == 1) {
          that.setData({
            headImg: res.data.info.head_img,
            card_name: res.data.info.card_name,
            card_description: res.data.info.card_description,
            score: res.data.info.score,
            min: res.data.minscore,
            max: res.data.maxscore,
            u_openid: res.data.info.u_openid
          })
          app.globalData.u_Openid = res.data.info.openid
          app.globalData.viewId = res.data.info.view_id
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
  },
  sliderBindchange:function(e){
    this.setData({
      text:e.detail.value
    })
    app.globalData.scored = e.detail.value
  },
  scores: function() {
    var that = this; 
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=doview',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        card_id: app.globalData.card_id,
        openid: wx.getStorageSync('userInfo').unionid,
        uid: wx.getStorageSync('userInfo').id,
        u_openid: app.globalData.u_Openid,
        view_id: app.globalData.viewId,
        score: app.globalData.scored,
        type: 2
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            score: res.data.info.score,
            min: res.data.minscore,
            max: res.data.maxscore
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
})
