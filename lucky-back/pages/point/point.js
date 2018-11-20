const app = getApp();

Page({
  data: {
    info:[],
    myviewlist:[]
  },
  onLoad: function (options) {
    getApp().globalData.tag_Id = options.id;
    getApp().globalData.u_Openid = options.u_openid;
  },
  onShow: function(e) {
    this.getData(e);
  },
  getData: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=view',
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
        var myviewlist = [];
        var count;
        myviewlist = res.data.myviewlist;
        if (myviewlist != null) {
          count = myviewlist.length;
        } else {
          count = 0
        }
        that.setData({
          info: res.data.info,
          myviewlist: myviewlist,
          count : count,
          maxscore: res.data.maxscore,
          minscore: res.data.minscore
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
        type: 1
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
  },
  viewpoint: function (e) {
    var point_id = e.currentTarget.id
    var cart_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/point/viewpoint?id=' + point_id + '&cart_id=' + cart_id
    })
  },
  takehim: function (e) {
    var id = getApp().globalData.tag_Id
    var u_openid = getApp().globalData.u_Openid
    wx.navigateTo({
      url: '../../pages/point/takehim?id=' + id + '&u_openid=' + u_openid
    })
  }
})