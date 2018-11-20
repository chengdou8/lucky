const app = getApp();

Page({
  data: {
    info: [],
    pointDetail: [],
    imgs:[]
  },
  onLoad: function (options) {
    getApp().globalData.point_Id = options.id;
    getApp().globalData.cart_Id = options.cart_id;
    this.getData();
  },
  getData: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=deal',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.point_Id,
        card_id: getApp().globalData.cart_Id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var imgs = [];
        imgs = res.data.res.item_img;
        that.setData({
          info: res.data.info,
          pointDetail: res.data.res,
          imgs: imgs,
          maxscore: res.data.maxscore,
          minscore: res.data.minscore,
        })
      }
    })
  },
  slider4change: function (e) {
    getApp().globalData.Score = e.detail.value
  },
  giveScore: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=doview',
      data: {
        openid: openid,
        uid: uid,
        card_id: getApp().globalData.tag_Id,
        u_openid: getApp().globalData.u_Openid,
        score: getApp().globalData.Score,
        type: 2,
        view_id: getApp().globalData.point_Id
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
          that.getData();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1000
          })
          that.getData();
          wx.navigateBack({
            url: '../../pages/point/point'
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
  backlist: function() {
    wx.navigateBack({
      url:'../../pages/point/point'
    })
  }
})