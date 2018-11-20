const app = getApp();

Page({
  data: {
    userinfo:[],
    finance_list:[]
  },
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');

    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=record',
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
          userinfo: res.data.userinfo,
          finance_list: res.data.finance_list
        })
        getApp().globalData.nickName = res.data.userinfo.nickname
        getApp().globalData.headImg = res.data.userinfo.head_img
        getApp().globalData.Sex = res.data.userinfo.sex
        getApp().globalData.Balance = res.data.userinfo.balance
      }
    })
  },
  mylucky: function () {
    wx.navigateBack({
      url: '../../pages/mylucky/mylucky'
    })
  },
  docash: function () {
    var nickname = getApp().globalData.nickName
    var head_img = getApp().globalData.headImg
    var sex = getApp().globalData.Sex
    var balance = getApp().globalData.Balance
    wx.navigateTo({
      url: '../../pages/mylucky/withdrawal?nickname=' + nickname + '&head_img=' + head_img + '&sex=' + sex + '&balance=' + balance
    })
  }
})