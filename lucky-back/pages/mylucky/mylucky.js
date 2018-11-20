//获取应用实例
const app = getApp()

Page({
  data: {
    userinfo:[],
    badgelist:[],
    badgelisttx:[],
    badgelistzj:[],
    badgelistjs:[],
    badgelistjss:[],
    edit: false,
    finished: true,
    showView: false,
    flag:true,
    share:true
  },
  onLoad: function (options) {
    this.getUserInfo();
    showView: (options.showView == "true" ? true : false)
  },
  onShow: function() {
    this.getUserInfo();
  },
  onChange: function () {
    this.setData({
      showView: (!this.data.showView),
      edit: true,
      finished: false
    })
  },
  onFinish: function (res) {
    this.setData({
      showView: (!this.data.showView),
      edit: false,
      finished: true
    })
    this.getUserInfo();
  },
  getUserInfo: function() {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=index',
      data: {
        openid: openid,
        uid: uid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          head_img: res.data.userinfo.head_img,
          nickname: res.data.userinfo.nickname,
          sex: res.data.userinfo.sex,
          badgelist: res.data.badgelist,
          badgelisttx: res.data.badgelisttx,
          badgelistzj: res.data.badgelistzj,
          badgelistjs: res.data.badgelistjs,
          badgelistjss: res.data.badgelistjss,
          qanswercount: res.data.qanswercount,
          moenycount: res.data.moenycount
        })
      }
    })
  },
  deltag: function(event) {
    var that = this;
    var openid = wx.getStorageSync('openid')
    var uid = wx.getStorageSync('uid')
    var id = event.currentTarget.dataset.deleteid
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=del_card',
      data: {
        openid: openid,
        uid: uid,
        id: id
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
          that.getUserInfo();
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
  askme: function (e) {
    wx.navigateTo({
      url: '../../pages/mylucky/askme'
    })
  },
  cash: function (e) {
    var nickname = getApp().globalData.nickName
    wx.navigateTo({
      url: '../../pages/mylucky/cashrecord?nickname=' + nickname
    })
  },
  finder: function (e) {
    wx.switchTab({
      url: '../../pages/seek/seek'
    })
  },
  viewpoint: function (e) {
    var id = e.currentTarget.id
    var color = e.currentTarget.dataset.color
    wx.navigateTo({
      url: '../../pages/mylucky/pointlist?id=' + id + '&color=' + color
    })
  },
  topTips: function () {
    this.setData({ flag: false })
  },
  hideModal: function () {
    this.setData({ flag: true })
  },
  share: function () {
    this.setData({ share: false })
  },
  closeshare: function () {
    this.setData({ share: true })
  } 
})