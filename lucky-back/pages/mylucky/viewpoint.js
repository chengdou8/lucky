const app = getApp();

Page({
  data: {
    info: [],
    pointDetail: [],
    imgs:[],
    flag:true
  },
  onLoad: function (options) {
    var tagcolor = options.color;
    getApp().globalData.point_Id = options.id;
    getApp().globalData.card_Id = options.card_id;
    this.getData();
    this.setData({
      tagcolor: tagcolor
    })
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
        card_id: getApp().globalData.card_Id
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
  backlist: function() {
    wx.navigateBack({
      url:'../../pages/mylucky/pointlist'
    })
  },
  modalcnt: function () {
    var that = this;
    wx.showModal({
      content: '确定要删除此观点吗？',
      success: function (res) {
        if (res.confirm) {
          that.delpoint();
        }
      }
    })
  },
  delpoint: function () {
    var that = this;
    var openid = wx.getStorageSync('openid')
    var uid = wx.getStorageSync('uid')
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=delview',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.point_Id,
        card_id: getApp().globalData.card_Id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            url: '../../pages/mylucky/pointlist'
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
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
  topTips: function () {
    this.setData({ flag: false })
  },
  hideModal: function () {
    this.setData({ flag: true })
  }
})