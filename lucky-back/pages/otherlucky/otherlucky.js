//获取应用实例
const app = getApp()

Page({
  data: {
    userinfo: [],
    badgelist: [],
    badgelisttx: [],
    badgelistzj: [],
    badgelistjs: [],
    badgelistjss: [],
    showView: false
  },
  onLoad: function (options) {
    var that = this;
    getApp().globalData.u_Openid = options.u_openid;
    getApp().globalData.Uid = options.uid;
    showView: (options.showView == "true" ? true : false)
    console.log(getApp().globalData.u_Openid)
    that.setData({
      nickname: options.nickname
    })
    wx.setNavigationBarTitle({
      title: that.data.nickname + '的绝招'
    })

    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=index&uid=' + getApp().globalData.Uid + '&openid=' + getApp().globalData.u_Openid,
      data: {
        openid: getApp().globalData.u_Openid,
        uid: getApp().globalData.Uid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          userinfo: res.data.userinfo,
          badgelist: res.data.badgelist,
          badgelisttx: res.data.badgelisttx,
          badgelistzj: res.data.badgelistzj,
          badgelistjs: res.data.badgelistjs,
          badgelistjss: res.data.badgelistjss
        })
      }
    })
  },
  finder: function (e) {
    wx.switchTab({
      url: '../../pages/seek/seek'
    })
  },
  viewpoint: function (e) {
    var id = e.currentTarget.id
    var u_openid = getApp().globalData.u_Openid
    wx.navigateTo({
      url: '../../pages/point/point?id=' + id + '&u_openid=' + u_openid
    })
  }
})