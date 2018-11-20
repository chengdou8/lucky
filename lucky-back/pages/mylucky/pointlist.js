const app = getApp();

Page({
  data: {
    info: [],
    myviewlist: [],
    flag: true
  },
  onLoad: function (options) {
    var tagcolor = options.color;
    getApp().globalData.tag_Id = options.id;
    this.setData({
      tagcolor: tagcolor
    })
  },
  onShow: function(e) {
    this.getData(e);
  },
  getData: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=myview',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.tag_Id
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
          count: count,
          maxscore: res.data.maxscore,
          minscore: res.data.minscore
        })

      }
    })
  },
  talk: function (e) {
    var id = getApp().globalData.tag_Id
    var color = e.currentTarget.dataset.color
    wx.navigateTo({
      url: '../../pages/mylucky/talk?id=' + id + '&color=' + color
    })
  },
  modalcnt: function (event) {
    var that = this;
    var id = event.currentTarget.id;
    var card_id = event.currentTarget.dataset.id;
    getApp().globalData.point_Id = id;
    getApp().globalData.card_Id = card_id;

    wx.showModal({
      content: '确定要删除此观点吗？',
      success: function (res) {
        if (res.confirm) {
          that.delpoint();
        }
      }
    })
  },
  delpoint: function() {
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
            content: res.data.message,
            icon: 'success',
            duration: 1500
          })
          that.getData();
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
    return false
  },
  viewpoint: function (e) {
    var point_id = e.currentTarget.id
    var card_id = e.currentTarget.dataset.id
    var color = e.currentTarget.dataset.color
    wx.navigateTo({
      url: '../../pages/mylucky/viewpoint?id=' + point_id + '&card_id=' + card_id + '&color=' + color
    })
  },
  topTips: function () {
    this.setData({ flag: false })
  },
  hideModal: function () {
    this.setData({ flag: true })
  }
})